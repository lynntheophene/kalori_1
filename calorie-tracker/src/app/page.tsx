'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Activity, Camera, Target, Zap, Sparkles, TrendingUp, Users, Star } from 'lucide-react'

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      <div className="absolute inset-0 bg-gradient-genz opacity-10 animate-gradient-slow" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neon-pink/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-neon-blue/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-neon-green/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-neon-purple/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black text-gradient animate-gradient-x mb-4">
                CalorieTracker
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-neon-pink animate-pulse" />
                <span className="text-neon-pink font-semibold text-lg">Track. Crush. Repeat.</span>
                <Sparkles className="w-6 h-6 text-neon-pink animate-pulse" />
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Your ultimate nutrition companion. Scan food, set goals, and crush your fitness journey with our 
              <span className="text-gradient-pink font-bold"> lightning-fast </span> 
              and 
              <span className="text-gradient-green font-bold"> intuitive </span> 
              calorie tracking app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={() => router.push('/auth')}
                className="text-lg px-10 py-4 text-xl font-bold glow-pink hover:scale-110 transform transition-all duration-300"
              >
                🚀 Get Started Now
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => router.push('/auth')}
                className="text-lg px-10 py-4 text-xl font-bold"
              >
                ✨ Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="glass-card p-6 text-center hover:scale-105 transform transition-all duration-300">
                <div className="text-3xl font-bold text-gradient-pink mb-2">10K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="glass-card p-6 text-center hover:scale-105 transform transition-all duration-300">
                <div className="text-3xl font-bold text-gradient-green mb-2">1M+</div>
                <div className="text-gray-400">Foods Scanned</div>
              </div>
              <div className="glass-card p-6 text-center hover:scale-105 transform transition-all duration-300">
                <div className="text-3xl font-bold text-gradient-purple mb-2">99%</div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-gradient mb-6">
            Why Choose CalorieTracker?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to achieve your nutrition goals in one 
            <span className="text-gradient-pink font-bold"> beautiful </span> 
            and 
            <span className="text-gradient-green font-bold"> powerful </span> 
            app
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card-glow group p-8 text-center hover:scale-105 transform transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-pink to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 glow-pink">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-pink">Food Scanning</h3>
            <p className="text-gray-400 leading-relaxed">
              Instantly scan and identify food items with our advanced AI recognition technology
            </p>
          </div>

          <div className="card-glow group p-8 text-center hover:scale-105 transform transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 glow-green">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-green">Smart Goals</h3>
            <p className="text-gray-400 leading-relaxed">
              Set personalized calorie goals based on your height, weight, and fitness objectives
            </p>
          </div>

          <div className="card-glow group p-8 text-center hover:scale-105 transform transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 glow-blue">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-blue">Real-time Sync</h3>
            <p className="text-gray-400 leading-relaxed">
              Your data syncs instantly across all devices with real-time updates
            </p>
          </div>

          <div className="card-glow group p-8 text-center hover:scale-105 transform transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-purple to-neon-pink rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 glow-purple">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-purple">Progress Tracking</h3>
            <p className="text-gray-400 leading-relaxed">
              Monitor your progress with detailed analytics and beautiful visualizations
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loved by Fitness Enthusiasts
          </h3>
          <div className="flex justify-center items-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-neon-yellow fill-current" />
            ))}
            <span className="text-gray-400 ml-2">4.9/5 from 2,000+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-blue rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <div className="font-semibold text-white">Sarah M.</div>
                <div className="text-gray-400 text-sm">Lost 30 lbs in 6 months</div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "This app literally changed my life! The food scanning is so accurate and the interface is gorgeous."
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <div className="font-semibold text-white">Mike R.</div>
                <div className="text-gray-400 text-sm">Gained 15 lbs muscle</div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "Perfect for tracking macros! The real-time sync across devices is a game-changer."
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <div className="font-semibold text-white">Alex K.</div>
                <div className="text-gray-400 text-sm">Maintaining for 2 years</div>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "The progress tracking is incredible. I love seeing my journey visualized so beautifully!"
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl border-t border-gray-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gradient mb-6">
            Ready to Crush Your Goals?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who have achieved their nutrition goals with CalorieTracker. 
            <span className="text-gradient-pink font-bold"> Start your journey today!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => router.push('/auth')}
              className="text-xl px-12 py-5 font-bold glow-pink hover:scale-110 transform transition-all duration-300"
            >
              🚀 Start Tracking Now
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => router.push('/auth')}
              className="text-xl px-12 py-5 font-bold"
            >
              ✨ See Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
