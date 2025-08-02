'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculateBMR, calculateDailyCalories, activityMultipliers } from '@/lib/utils'
import { User, Target, Activity, Scale } from 'lucide-react'
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

      toast.success('Profile updated successfully!')
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-foreground-muted">
            Tell us about yourself to get personalized calorie recommendations
          </p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Age"
                  placeholder="25"
                  value={profile.age || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  required
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Gender
                  </label>
                  <select
                    className="input"
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
              <div className="grid md:grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Activity Level
                </label>
                <select
                  className="input"
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Your Goal
                </label>
                <select
                  className="input"
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
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Your Daily Calorie Target</h3>
                  <p className="text-2xl font-bold text-foreground">
                    {calculatePreviewCalories()} calories
                  </p>
                  <p className="text-sm text-foreground-muted mt-1">
                    Based on your profile and {profile.goal} goal
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                loading={loading}
                size="lg"
              >
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}