'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { FoodScanner } from '@/components/FoodScanner'
import { LogOut, Plus, Target, TrendingUp, Calendar, Settings } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { User } from '@supabase/supabase-js'

interface FoodLog {
  id: string
  food_name: string
  calories: number
  protein: number | null
  carbs: number | null
  fat: number | null
  quantity: number
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  logged_at: string
}

interface UserProfile {
  target_calories: number | null
  goal: 'lose' | 'maintain' | 'gain' | null
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([])
  const [showScanner, setShowScanner] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const today = new Date().toISOString().split('T')[0]

  const loadTodaysFoodLogs = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('food_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('logged_at', `${today}T00:00:00.000Z`)
      .lt('logged_at', `${today}T23:59:59.999Z`)
      .order('logged_at', { ascending: false })

    if (error) {
      toast.error('Error loading food logs')
      return
    }

    setFoodLogs(data || [])
  }, [today])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUser(user)

      // Get user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('target_calories, goal')
        .eq('user_id', user.id)
        .single()

      if (!profileData) {
        router.push('/profile')
        return
      }

      setProfile(profileData)
      await loadTodaysFoodLogs(user.id)
      setLoading(false)
    }
    getUser()
  }, [router, loadTodaysFoodLogs])

  const handleFoodAdd = async (food: { name: string; calories_per_100g: number; protein_per_100g?: number; carbs_per_100g?: number; fat_per_100g?: number }, quantity: number, mealType: string) => {
    if (!user) return

    try {
      const calories = Math.round((food.calories_per_100g * quantity) / 100)
      const protein = food.protein_per_100g ? Math.round((food.protein_per_100g * quantity) / 100 * 10) / 10 : null
      const carbs = food.carbs_per_100g ? Math.round((food.carbs_per_100g * quantity) / 100 * 10) / 10 : null
      const fat = food.fat_per_100g ? Math.round((food.fat_per_100g * quantity) / 100 * 10) / 10 : null

      const { data, error } = await supabase
        .from('food_logs')
        .insert({
          user_id: user.id,
          food_name: food.name,
          calories,
          protein,
          carbs,
          fat,
          quantity,
          meal_type: mealType,
          logged_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      setFoodLogs(prev => [data, ...prev])
      setShowScanner(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error adding food'
      toast.error(errorMessage)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const deleteFoodLog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('food_logs')
        .delete()
        .eq('id', id)

      if (error) throw error

      setFoodLogs(prev => prev.filter(log => log.id !== id))
      toast.success('Food log deleted')
    } catch {
      toast.error('Error deleting food log')
    }
  }

  const getTotalCalories = () => {
    return foodLogs.reduce((total, log) => total + log.calories, 0)
  }

  const getTotalMacros = () => {
    return foodLogs.reduce((totals, log) => ({
      protein: totals.protein + (log.protein || 0),
      carbs: totals.carbs + (log.carbs || 0),
      fat: totals.fat + (log.fat || 0)
    }), { protein: 0, carbs: 0, fat: 0 })
  }

  const getMealLogs = (mealType: string) => {
    return foodLogs.filter(log => log.meal_type === mealType)
  }

  const getMealCalories = (mealType: string) => {
    return getMealLogs(mealType).reduce((total, log) => total + log.calories, 0)
  }

  const getProgressPercentage = () => {
    if (!profile?.target_calories) return 0
    return Math.min((getTotalCalories() / profile.target_calories) * 100, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gradient">CalorieTracker</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/profile')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Daily Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-foreground-muted mb-1">
                    <span>Calories</span>
                    <span>{getTotalCalories()} / {profile?.target_calories || 0}</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-accent">
                      {Math.round(getTotalMacros().protein)}g
                    </div>
                    <div className="text-xs text-foreground-muted">Protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-primary">
                      {Math.round(getTotalMacros().carbs)}g
                    </div>
                    <div className="text-xs text-foreground-muted">Carbs</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-yellow-500">
                      {Math.round(getTotalMacros().fat)}g
                    </div>
                    <div className="text-xs text-foreground-muted">Fat</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Today&apos;s Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {profile?.target_calories || 0}
                </div>
                <div className="text-foreground-muted">calories target</div>
                <div className="mt-4 text-sm">
                  <span className="text-accent font-medium">
                    {profile?.goal?.charAt(0).toUpperCase()}{profile?.goal?.slice(1)} Weight
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Remaining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {Math.max(0, (profile?.target_calories || 0) - getTotalCalories())}
                </div>
                <div className="text-foreground-muted">calories left</div>
                <div className="mt-4">
                  {getProgressPercentage() >= 100 ? (
                    <div className="text-accent text-sm">Goal reached! 🎉</div>
                  ) : (
                    <div className="text-primary text-sm">
                      {Math.round(100 - getProgressPercentage())}% to go
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Sections */}
        <div className="space-y-6">
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
            <Card key={mealType}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="capitalize">{mealType}</CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-foreground-muted">
                      {getMealCalories(mealType)} calories
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedMeal(mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack')
                        setShowScanner(true)
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Food
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {getMealLogs(mealType).length === 0 ? (
                  <div className="text-center py-8 text-foreground-muted">
                    No food logged for {mealType}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getMealLogs(mealType).map((log) => (
                      <div 
                        key={log.id}
                        className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{log.food_name}</h4>
                          <p className="text-sm text-foreground-muted">
                            {log.quantity}g • {log.calories} cal
                            {log.protein && ` • ${log.protein}g protein`}
                          </p>
                          <p className="text-xs text-foreground-muted">
                            {formatTime(log.logged_at)}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteFoodLog(log.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Food Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Food to {selectedMeal}</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowScanner(false)}
                >
                  ×
                </Button>
              </div>
              <FoodScanner 
                onFoodAdd={handleFoodAdd}
                mealType={selectedMeal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}