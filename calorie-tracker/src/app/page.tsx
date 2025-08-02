'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Camera, Target, Zap, Activity, Sparkles, Star } from 'lucide-react'

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

  const heroStyle = {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)',
    minHeight: '100vh',
    color: '#ffffff',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #ff0080 0%, #00d4ff 50%, #00ff88 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  }

  const buttonStyle = {
    background: 'linear-gradient(135deg, #ff0080 0%, #00d4ff 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 32px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 0, 128, 0.3)',
    minWidth: '200px',
  }

  const secondaryButtonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '16px 32px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    minWidth: '200px',
  }

  const featureCardStyle = {
    ...glassCardStyle,
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  }

  return (
    <div style={heroStyle}>
      {/* Animated Background Elements */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(25px)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          animation: 'float 7s ease-in-out infinite',
        }}
      />

      {/* Hero Section */}
      <div style={{ position: 'relative', zIndex: 10, padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Main Title */}
          <div style={{ marginBottom: '40px' }}>
            <h1 
              style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontWeight: '900',
                margin: '0 0 20px 0',
                ...gradientTextStyle,
                textShadow: '0 0 30px rgba(255, 0, 128, 0.5)',
              }}
            >
              CalorieTracker
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              <Sparkles style={{ width: '24px', height: '24px', color: '#ff0080' }} />
              <span style={{ color: '#ff0080', fontWeight: '600', fontSize: '20px' }}>Track. Crush. Repeat.</span>
              <Sparkles style={{ width: '24px', height: '24px', color: '#ff0080' }} />
            </div>
          </div>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', 
            color: '#e5e5e5', 
            marginBottom: '50px', 
            maxWidth: '800px', 
            margin: '0 auto 50px auto',
            lineHeight: '1.6',
          }}>
            Your ultimate nutrition companion. Scan food, set goals, and crush your fitness journey with our{' '}
            <span style={{ ...gradientTextStyle, fontWeight: 'bold' }}>lightning-fast</span>{' '}
            and{' '}
            <span style={{ ...gradientTextStyle, fontWeight: 'bold' }}>intuitive</span>{' '}
            calorie tracking app.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '60px' }}>
            <button 
              style={buttonStyle}
              onClick={() => router.push('/auth')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 128, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 0, 128, 0.3)';
              }}
            >
              🚀 Get Started Now
            </button>
            <button 
              style={secondaryButtonStyle}
              onClick={() => router.push('/auth')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 0, 128, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              ✨ Learn More
            </button>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '30px', 
            maxWidth: '800px', 
            margin: '0 auto 80px auto' 
          }}>
            <div style={glassCardStyle}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', ...gradientTextStyle, marginBottom: '10px' }}>10K+</div>
              <div style={{ color: '#a1a1aa' }}>Active Users</div>
            </div>
            <div style={glassCardStyle}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', ...gradientTextStyle, marginBottom: '10px' }}>1M+</div>
              <div style={{ color: '#a1a1aa' }}>Foods Scanned</div>
            </div>
            <div style={glassCardStyle}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', ...gradientTextStyle, marginBottom: '10px' }}>99%</div>
              <div style={{ color: '#a1a1aa' }}>Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ position: 'relative', zIndex: 10, padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: '900', 
            ...gradientTextStyle, 
            marginBottom: '30px' 
          }}>
            Why Choose CalorieTracker?
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#a1a1aa', 
            maxWidth: '600px', 
            margin: '0 auto 60px auto',
            lineHeight: '1.6',
          }}>
            Everything you need to achieve your nutrition goals in one{' '}
            <span style={{ ...gradientTextStyle, fontWeight: 'bold' }}>beautiful</span>{' '}
            and{' '}
            <span style={{ ...gradientTextStyle, fontWeight: 'bold' }}>powerful</span>{' '}
            app
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px',
            marginBottom: '80px' 
          }}>
            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 0, 128, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #ff0080 0%, #00d4ff 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px auto',
                boxShadow: '0 4px 15px rgba(255, 0, 128, 0.3)',
              }}>
                <Camera style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', ...gradientTextStyle }}>Food Scanning</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.5' }}>
                Instantly scan and identify food items with our advanced AI recognition technology
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 255, 136, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px auto',
                boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
              }}>
                <Target style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', ...gradientTextStyle }}>Smart Goals</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.5' }}>
                Set personalized calorie goals based on your height, weight, and fitness objectives
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px auto',
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
              }}>
                <Zap style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', ...gradientTextStyle }}>Real-time Sync</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.5' }}>
                Your data syncs instantly across all devices with real-time updates
              </p>
            </div>

            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ff0080 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px auto',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              }}>
                <Activity style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', ...gradientTextStyle }}>Progress Tracking</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.5' }}>
                Monitor your progress with detailed analytics and beautiful visualizations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div style={{ position: 'relative', zIndex: 10, padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>
            Loved by Fitness Enthusiasts
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '24px', height: '24px', color: '#fbbf24', fill: '#fbbf24' }} />
            ))}
            <span style={{ color: '#a1a1aa', marginLeft: '10px' }}>4.9/5 from 2,000+ reviews</span>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '80px' 
          }}>
            <div style={glassCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #ff0080 0%, #00d4ff 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                  S
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: 'white' }}>Sarah M.</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Lost 30 lbs in 6 months</div>
                </div>
              </div>
              <p style={{ color: '#e5e5e5', fontStyle: 'italic', textAlign: 'left' }}>
                "This app literally changed my life! The food scanning is so accurate and the interface is gorgeous."
              </p>
            </div>

            <div style={glassCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                  M
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: 'white' }}>Mike R.</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Gained 15 lbs muscle</div>
                </div>
              </div>
              <p style={{ color: '#e5e5e5', fontStyle: 'italic', textAlign: 'left' }}>
                "Perfect for tracking macros! The real-time sync across devices is a game-changer."
              </p>
            </div>

            <div style={glassCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ff0080 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                  A
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: 'white' }}>Alex K.</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Maintaining for 2 years</div>
                </div>
              </div>
              <p style={{ color: '#e5e5e5', fontStyle: 'italic', textAlign: 'left' }}>
                "The progress tracking is incredible. I love seeing my journey visualized so beautifully!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        padding: '80px 20px 120px 20px',
        background: 'linear-gradient(135deg, rgba(255, 0, 128, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: '900', 
            ...gradientTextStyle, 
            marginBottom: '30px' 
          }}>
            Ready to Crush Your Goals?
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#a1a1aa', 
            marginBottom: '50px', 
            maxWidth: '600px', 
            margin: '0 auto 50px auto',
            lineHeight: '1.6',
          }}>
            Join thousands of users who have achieved their nutrition goals with CalorieTracker.{' '}
            <span style={{ ...gradientTextStyle, fontWeight: 'bold' }}>Start your journey today!</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            <button 
              style={buttonStyle}
              onClick={() => router.push('/auth')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 128, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 0, 128, 0.3)';
              }}
            >
              🚀 Start Tracking Now
            </button>
            <button 
              style={secondaryButtonStyle}
              onClick={() => router.push('/auth')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 0, 128, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              ✨ See Demo
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        * {
          font-family: 'Inter', system-ui, sans-serif;
        }
      `}</style>
    </div>
  )
}
