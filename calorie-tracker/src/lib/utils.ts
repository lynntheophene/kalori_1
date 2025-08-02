import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// BMR calculation using Mifflin-St Jeor Equation
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

// Activity level multipliers
export const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extremely_active: 1.9
}

// Calculate daily calorie needs
export function calculateDailyCalories(
  bmr: number, 
  activityLevel: keyof typeof activityMultipliers,
  goal: 'lose' | 'maintain' | 'gain'
): number {
  const maintenanceCalories = bmr * activityMultipliers[activityLevel]
  
  switch (goal) {
    case 'lose':
      return Math.round(maintenanceCalories - 500) // 1 lb per week deficit
    case 'gain':
      return Math.round(maintenanceCalories + 500) // 1 lb per week surplus
    case 'maintain':
    default:
      return Math.round(maintenanceCalories)
  }
}

// Format date for display
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Format time for display
export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}