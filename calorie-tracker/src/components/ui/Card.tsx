import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'glow'
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'rounded-2xl border border-gray-600/30 bg-gray-900/50 backdrop-blur-md p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-neon-pink/30 hover:bg-gray-900/70',
    glass: 'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl',
    glow: 'rounded-2xl border border-gray-600/30 bg-gray-900/50 backdrop-blur-md p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-neon-pink/30 hover:bg-gray-900/70 hover:shadow-neon-pink/20 hover:scale-105 transform'
  }

  return (
    <div
      className={cn(
        'animate-fade-in',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-6', className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-xl font-bold leading-none tracking-tight', className)}>
      {children}
    </h3>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('pt-0', className)}>
      {children}
    </div>
  )
}