'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculateBMR, calculateDailyCalories, activityMultipliers } from '@/lib/utils'
import { User, Target, Activity, Scale, Sparkles, Flame, Zap, Trophy } from 'lucide-react'
import toast from 'react-hot-toast'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface UserProfile {
  height: number
  weight: number
  age: number
  gender: 'male' | 'female' | 'other'
  activity_level: keyof typeof activityMultipliers
  goal: 'lose' | 'maintain' | 'gain'
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile>({
    height: 0,
    weight: 0,
    age: 0,
    gender: 'male',
    activity_level: 'moderately_active',
    goal: 'maintain'
  })
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUser(user)

      // Check if user already has a profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (existingProfile) {
        setProfile({
          height: existingProfile.height || 0,
          weight: existingProfile.weight || 0,
          age: existingProfile.age || 0,
          gender: existingProfile.gender || 'male',
          activity_level: existingProfile.activity_level || 'moderately_active',
          goal: existingProfile.goal || 'maintain'
        })
      }
    }
    getUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      // Calculate target calories
      const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender as 'male' | 'female')
      const targetCalories = calculateDailyCalories(bmr, profile.activity_level, profile.goal)

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          height: profile.height,
          weight: profile.weight,
          age: profile.age,
          gender: profile.gender,
          activity_level: profile.activity_level,
          goal: profile.goal,
          target_calories: targetCalories,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast.success('Profile updated successfully! 🚀')
      router.push('/dashboard')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const calculatePreviewCalories = () => {
    if (profile.height && profile.weight && profile.age) {
      const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender as 'male' | 'female')
      return calculateDailyCalories(bmr, profile.activity_level, profile.goal)
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      <div className="absolute inset-0 bg-gradient-genz opacity-5 animate-gradient-slow" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-neon-pink/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-neon-blue/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-neon-green/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-blue rounded-xl flex items-center justify-center glow-pink">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gradient">
              Set Up Your Profile
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-neon-pink animate-pulse" />
            <span className="text-neon-pink font-semibold">Personalize your journey</span>
            <Sparkles className="w-4 h-4 text-neon-pink animate-pulse" />
          </div>
          <p className="text-gray-400">
            Tell us about yourself to get personalized calorie recommendations
          </p>
        </div>

        <Card variant="glass" className="backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center glow-green">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gradient-green">Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Age"
                  placeholder="25"
                  value={profile.age || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  required
                />
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">
                    Gender
                  </label>
                  <select
                    className="flex h-12 w-full rounded-xl border border-gray-600/50 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-neon-pink/30"
                    value={profile.gender}
                    onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' | 'other' }))}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Height (cm)"
                  placeholder="175"
                  value={profile.height || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                  icon={<Scale className="w-4 h-4" />}
                  required
                />
                
                <Input
                  type="number"
                  label="Weight (kg)"
                  placeholder="70"
                  value={profile.weight || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                  icon={<Scale className="w-4 h-4" />}
                  required
                />
              </div>

              {/* Activity Level */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neon-blue" />
                  Activity Level
                </label>
                <select
                  className="flex h-12 w-full rounded-xl border border-gray-600/50 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-neon-pink/30"
                  value={profile.activity_level}
                  onChange={(e) => setProfile(prev => ({ ...prev, activity_level: e.target.value as keyof typeof activityMultipliers }))}
                  required
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
                  <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
                  <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
                  <option value="extremely_active">Extremely Active (very hard exercise/physical job)</option>
                </select>
              </div>

              {/* Goal */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-neon-green" />
                  Your Goal
                </label>
                <select
                  className="flex h-12 w-full rounded-xl border border-gray-600/50 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-neon-pink/30"
                  value={profile.goal}
                  onChange={(e) => setProfile(prev => ({ ...prev, goal: e.target.value as 'lose' | 'maintain' | 'gain' }))}
                  required
                >
                  <option value="lose">Lose Weight (-500 cal/day)</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight (+500 cal/day)</option>
                </select>
              </div>

              {/* Calorie Preview */}
              {calculatePreviewCalories() > 0 && (
                <div className="glass-card p-6 border border-neon-pink/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-pink to-neon-blue rounded-lg flex items-center justify-center glow-pink">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gradient-pink">Your Daily Calorie Target</h3>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-gradient-green mb-2">
                      {calculatePreviewCalories()} calories
                    </p>
                    <p className="text-sm text-gray-400">
                      Based on your profile and <span className="text-neon-pink font-semibold">{profile.goal}</span> goal
                    </p>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full glow-pink hover:scale-105 transform" 
                loading={loading}
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}