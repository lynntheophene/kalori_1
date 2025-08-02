import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  className, 
  children, 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:from-neon-blue hover:to-neon-green shadow-lg hover:shadow-neon-pink/25 hover:scale-105 transform glow-pink',
    secondary: 'bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 border border-gray-600/50 hover:border-neon-pink/50 shadow-lg hover:shadow-neon-pink/25',
    accent: 'bg-gradient-to-r from-neon-green to-neon-blue text-white hover:from-neon-blue hover:to-neon-purple shadow-lg hover:shadow-neon-green/25 hover:scale-105 transform glow-green',
    destructive: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-pink-500 hover:to-red-500 shadow-lg hover:shadow-red-500/25',
    ghost: 'bg-transparent text-white hover:bg-white/10 border border-transparent hover:border-neon-pink/50'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && 'opacity-70 cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="relative mr-3">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </button>
  )
}