import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          height: number | null
          weight: number | null
          age: number | null
          gender: 'male' | 'female' | 'other' | null
          activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active' | null
          goal: 'lose' | 'maintain' | 'gain' | null
          target_calories: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          height?: number | null
          weight?: number | null
          age?: number | null
          gender?: 'male' | 'female' | 'other' | null
          activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active' | null
          goal?: 'lose' | 'maintain' | 'gain' | null
          target_calories?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          height?: number | null
          weight?: number | null
          age?: number | null
          gender?: 'male' | 'female' | 'other' | null
          activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active' | null
          goal?: 'lose' | 'maintain' | 'gain' | null
          target_calories?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      food_logs: {
        Row: {
          id: string
          user_id: string
          food_name: string
          calories: number
          protein: number | null
          carbs: number | null
          fat: number | null
          quantity: number
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          logged_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          food_name: string
          calories: number
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          quantity?: number
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          logged_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          food_name?: string
          calories?: number
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          quantity?: number
          meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          logged_at?: string
          created_at?: string
        }
      }
      foods: {
        Row: {
          id: string
          name: string
          calories_per_100g: number
          protein_per_100g: number | null
          carbs_per_100g: number | null
          fat_per_100g: number | null
          brand: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          calories_per_100g: number
          protein_per_100g?: number | null
          carbs_per_100g?: number | null
          fat_per_100g?: number | null
          brand?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          calories_per_100g?: number
          protein_per_100g?: number | null
          carbs_per_100g?: number | null
          fat_per_100g?: number | null
          brand?: string | null
          category?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}