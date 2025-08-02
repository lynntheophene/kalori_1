'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Mail, Lock, Sparkles, Flame, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) throw error

        toast.success('Welcome back! 🚀')
        router.push('/dashboard')
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          return
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        })

        if (error) throw error

        toast.success('Account created! Please check your email to verify. ✨')
        setIsLogin(true)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      <div className="absolute inset-0 bg-gradient-genz opacity-5 animate-gradient-slow" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neon-pink/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-neon-blue/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-neon-green/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-neon-purple/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-blue rounded-xl flex items-center justify-center glow-pink">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gradient">
              CalorieTracker
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-neon-pink animate-pulse" />
            <span className="text-neon-pink font-semibold">Track. Crush. Repeat.</span>
            <Sparkles className="w-4 h-4 text-neon-pink animate-pulse" />
          </div>
          <p className="text-gray-400">
            Your ultimate nutrition companion
          </p>
        </div>

        <Card variant="glass" className="backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-black">
              <span className="text-gradient-pink">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                icon={<Mail size={18} />}
                required
              />
              
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                icon={<Lock size={18} />}
                required
              />

              {!isLogin && (
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  icon={<Lock size={18} />}
                  required
                />
              )}

              <Button 
                type="submit" 
                className="w-full glow-pink hover:scale-105 transform" 
                loading={loading}
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-neon-pink hover:text-neon-blue transition-colors font-semibold hover:scale-105 transform"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}