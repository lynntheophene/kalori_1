'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Activity, Camera, Target, Zap } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20 opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in">
              CalorieTracker
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
              Track your nutrition goals with ease. Scan food, set goals, and reach your targets with our super fast and intuitive app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button 
                size="lg" 
                onClick={() => router.push('/auth')}
                className="text-lg px-8 py-4"
              >
                Get Started
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => router.push('/auth')}
                className="text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose CalorieTracker?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to achieve your nutrition goals in one beautiful app
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-xl bg-gray-900 border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors">
              <Camera className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Food Scanning</h3>
            <p className="text-gray-400">
              Instantly scan and identify food items with our advanced recognition technology
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-900 border border-gray-600 hover:border-green-500/50 transition-all duration-300 group">
            <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/20 transition-colors">
              <Target className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Goals</h3>
            <p className="text-gray-400">
              Set personalized calorie goals based on your height, weight, and fitness objectives
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-900 border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Sync</h3>
            <p className="text-gray-400">
              Your data syncs instantly across all devices with real-time updates
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-900 border border-gray-600 hover:border-green-500/50 transition-all duration-300 group">
            <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/20 transition-colors">
              <Activity className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Monitor your progress with detailed analytics and beautiful visualizations
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have achieved their nutrition goals with CalorieTracker
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push('/auth')}
            className="text-lg px-8 py-4"
          >
            Start Tracking Now
          </Button>
        </div>
      </div>
    </div>
  )
}
