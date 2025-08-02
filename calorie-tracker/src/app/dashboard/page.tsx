'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { FoodScanner } from '@/components/FoodScanner'
import { LogOut, Plus, Target, TrendingUp, Calendar, Settings, Sparkles, Flame, Zap, Trophy } from 'lucide-react'
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

      if (error) {
        toast.error('Error adding food')
        return
      }

      toast.success('Food added successfully!')
      setShowScanner(false)
      await loadTodaysFoodLogs(user.id)
    } catch (error) {
      toast.error('Error adding food')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const deleteFoodLog = async (id: string) => {
    const { error } = await supabase
      .from('food_logs')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Error deleting food log')
      return
    }

    toast.success('Food deleted successfully!')
    await loadTodaysFoodLogs(user!.id)
  }

  const getTotalCalories = () => {
    return foodLogs.reduce((total, log) => total + log.calories, 0)
  }

  const getTotalMacros = () => {
    return foodLogs.reduce((total, log) => ({
      protein: total.protein + (log.protein || 0),
      carbs: total.carbs + (log.carbs || 0),
      fat: total.fat + (log.fat || 0)
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
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neon-pink/30 border-t-neon-pink rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      <div className="absolute inset-0 bg-gradient-genz opacity-5 animate-gradient-slow" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-neon-pink/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-neon-blue/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-neon-green/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl border-b border-gray-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-neon-blue rounded-xl flex items-center justify-center glow-pink">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-black text-gradient">CalorieTracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/profile')}
                className="hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Daily Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-pink to-neon-blue rounded-lg flex items-center justify-center glow-pink">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <span className="text-gradient-pink">Daily Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-3">
                    <span>Calories</span>
                    <span className="font-semibold">{getTotalCalories()} / {profile?.target_calories || 0}</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-neon-pink to-neon-blue h-3 rounded-full transition-all duration-500 glow-pink"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-gradient-green mb-1">
                      {Math.round(getTotalMacros().protein)}g
                    </div>
                    <div className="text-xs text-gray-400">Protein</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-gradient-pink mb-1">
                      {Math.round(getTotalMacros().carbs)}g
                    </div>
                    <div className="text-xs text-gray-400">Carbs</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-gradient-purple mb-1">
                      {Math.round(getTotalMacros().fat)}g
                    </div>
                    <div className="text-xs text-gray-400">Fat</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center glow-green">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className="text-gradient-green">Today's Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-black text-gradient-green mb-2">
                  {profile?.target_calories || 0}
                </div>
                <div className="text-gray-400 mb-4">calories target</div>
                <div className="glass-card p-3">
                  <span className="text-neon-green font-bold text-sm">
                    {profile?.goal?.charAt(0).toUpperCase()}{profile?.goal?.slice(1)} Weight
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-blue">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-gradient-blue">Remaining</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-black text-gradient-blue mb-2">
                  {Math.max(0, (profile?.target_calories || 0) - getTotalCalories())}
                </div>
                <div className="text-gray-400 mb-4">calories left</div>
                <div className="glass-card p-3">
                  {getProgressPercentage() >= 100 ? (
                    <div className="flex items-center justify-center gap-2 text-neon-green font-bold">
                      <Trophy className="w-4 h-4" />
                      Goal reached! 🎉
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-neon-blue font-bold">
                      <Zap className="w-4 h-4" />
                      {Math.round(100 - getProgressPercentage())}% to go
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Sections */}
        <div className="space-y-8">
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType, index) => (
            <Card key={mealType} className="card-glow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-neon-yellow to-neon-orange glow-pink' :
                      index === 1 ? 'bg-gradient-to-br from-neon-green to-neon-blue glow-green' :
                      index === 2 ? 'bg-gradient-to-br from-neon-purple to-neon-pink glow-purple' :
                      'bg-gradient-to-br from-neon-blue to-neon-green glow-blue'
                    }`}>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="capitalize text-xl font-black">
                      <span className={`${
                        index === 0 ? 'text-gradient-pink' :
                        index === 1 ? 'text-gradient-green' :
                        index === 2 ? 'text-gradient-purple' :
                        'text-gradient-blue'
                      }`}>
                        {mealType}
                      </span>
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="glass-card px-4 py-2">
                      <span className="text-sm text-gray-400">
                        {getMealCalories(mealType)} calories
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedMeal(mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack')
                        setShowScanner(true)
                      }}
                      className="glow-pink hover:scale-105 transform"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Food
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {getMealLogs(mealType).length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-lg font-medium">No food logged for {mealType}</p>
                    <p className="text-sm">Click "Add Food" to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getMealLogs(mealType).map((log) => (
                      <div 
                        key={log.id}
                        className="glass-card p-4 hover:scale-105 transform transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-2">{log.food_name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                              <span>{log.quantity}g</span>
                              <span className="text-neon-pink font-semibold">{log.calories} cal</span>
                              {log.protein && <span className="text-neon-green">• {log.protein}g protein</span>}
                            </div>
                            <p className="text-xs text-gray-500">
                              {formatTime(log.logged_at)}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFoodLog(log.id)}
                            className="ml-4 hover:scale-110 transform"
                          >
                            Delete
                          </Button>
                        </div>
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gradient">Add Food to {selectedMeal}</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowScanner(false)}
                  className="hover:bg-white/10"
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