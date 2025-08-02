import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ 
  label, 
  error, 
  icon, 
  className, 
  ...props 
}: InputProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'flex h-12 w-full rounded-xl border border-gray-600/50 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-neon-pink/30',
            icon && 'pl-12',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400 animate-slide-up font-medium">
          {error}
        </p>
      )}
    </div>
  )
}