import { create } from 'zustand'
import { supabase } from './supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface FoodLog {
  id: string
  user_id: string
  food_name: string
  calories: number
  protein: number | null
  carbs: number | null
  fat: number | null
  quantity: number
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  logged_at: string
  created_at: string
}

interface CalorieStore {
  foodLogs: FoodLog[]
  isLoading: boolean
  subscriptions: RealtimeChannel[]
  
  // Actions
  setFoodLogs: (logs: FoodLog[]) => void
  addFoodLog: (log: FoodLog) => void
  removeFoodLog: (id: string) => void
  setLoading: (loading: boolean) => void
  
  // Real-time subscriptions
  subscribeToFoodLogs: (userId: string) => void
  unsubscribeAll: () => void
  
  // Computed values
  getTotalCalories: () => number
  getTotalMacros: () => { protein: number; carbs: number; fat: number }
  getMealLogs: (mealType: string) => FoodLog[]
  getMealCalories: (mealType: string) => number
}

export const useCalorieStore = create<CalorieStore>((set, get) => ({
  foodLogs: [],
  isLoading: false,
  subscriptions: [],
  
  setFoodLogs: (logs) => set({ foodLogs: logs }),
  
  addFoodLog: (log) => set((state) => ({
    foodLogs: [log, ...state.foodLogs]
  })),
  
  removeFoodLog: (id) => set((state) => ({
    foodLogs: state.foodLogs.filter(log => log.id !== id)
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  subscribeToFoodLogs: (userId: string) => {
    const today = new Date().toISOString().split('T')[0]
    
    // Subscribe to food_logs changes for today
    const subscription = supabase
      .channel('food_logs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'food_logs',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload
          
          // Only handle today's logs
          const newRecordTyped = newRecord as FoodLog | null
          const oldRecordTyped = oldRecord as FoodLog | null
          const logDate = newRecordTyped?.logged_at?.split('T')[0] || oldRecordTyped?.logged_at?.split('T')[0]
          if (logDate !== today) return
          
          switch (eventType) {
            case 'INSERT':
              if (newRecordTyped) {
                get().addFoodLog(newRecordTyped)
              }
              break
            case 'DELETE':
              if (oldRecordTyped) {
                get().removeFoodLog(oldRecordTyped.id)
              }
              break
            case 'UPDATE':
              if (newRecordTyped) {
                // Remove old and add new
                get().removeFoodLog(newRecordTyped.id)
                get().addFoodLog(newRecordTyped)
              }
              break
          }
        }
      )
      .subscribe()
    
    set((state) => ({
      subscriptions: [...state.subscriptions, subscription]
    }))
  },
  
  unsubscribeAll: () => {
    const { subscriptions } = get()
    subscriptions.forEach(subscription => {
      supabase.removeChannel(subscription)
    })
    set({ subscriptions: [] })
  },
  
  getTotalCalories: () => {
    return get().foodLogs.reduce((total, log) => total + log.calories, 0)
  },
  
  getTotalMacros: () => {
    return get().foodLogs.reduce(
      (totals, log) => ({
        protein: totals.protein + (log.protein || 0),
        carbs: totals.carbs + (log.carbs || 0),
        fat: totals.fat + (log.fat || 0)
      }),
      { protein: 0, carbs: 0, fat: 0 }
    )
  },
  
  getMealLogs: (mealType: string) => {
    return get().foodLogs.filter(log => log.meal_type === mealType)
  },
  
  getMealCalories: (mealType: string) => {
    return get().getMealLogs(mealType).reduce((total, log) => total + log.calories, 0)
  }
}))

// Cleanup function for component unmount
export const cleanupStore = () => {
  const store = useCalorieStore.getState()
  store.unsubscribeAll()
}