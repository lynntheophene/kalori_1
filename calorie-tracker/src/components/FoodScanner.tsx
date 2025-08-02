'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Camera, Search, Plus, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface FoodItem {
  id: string
  name: string
  calories_per_100g: number
  protein_per_100g?: number
  carbs_per_100g?: number
  fat_per_100g?: number
  brand?: string
}

interface FoodScannerProps {
  onFoodAdd: (food: FoodItem, quantity: number, mealType: string) => void
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

// Common food items for quick access
const commonFoods: FoodItem[] = [
  { id: '1', name: 'Banana', calories_per_100g: 89, protein_per_100g: 1.1, carbs_per_100g: 23, fat_per_100g: 0.3 },
  { id: '2', name: 'Apple', calories_per_100g: 52, protein_per_100g: 0.3, carbs_per_100g: 14, fat_per_100g: 0.2 },
  { id: '3', name: 'Chicken Breast', calories_per_100g: 165, protein_per_100g: 31, carbs_per_100g: 0, fat_per_100g: 3.6 },
  { id: '4', name: 'Rice (cooked)', calories_per_100g: 130, protein_per_100g: 2.7, carbs_per_100g: 28, fat_per_100g: 0.3 },
  { id: '5', name: 'Broccoli', calories_per_100g: 34, protein_per_100g: 2.8, carbs_per_100g: 7, fat_per_100g: 0.4 },
  { id: '6', name: 'Egg', calories_per_100g: 155, protein_per_100g: 13, carbs_per_100g: 1.1, fat_per_100g: 11 },
  { id: '7', name: 'Oats', calories_per_100g: 389, protein_per_100g: 17, carbs_per_100g: 66, fat_per_100g: 7 },
  { id: '8', name: 'Salmon', calories_per_100g: 208, protein_per_100g: 20, carbs_per_100g: 0, fat_per_100g: 13 }
]

export function FoodScanner({ onFoodAdd, mealType }: FoodScannerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [quantity, setQuantity] = useState(100)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const searchFoods = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      // Search in database first
      const { data: dbResults, error } = await supabase
        .from('foods')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10)

      if (error) throw error

      // Combine with common foods
      const filteredCommon = commonFoods.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      )

      const combinedResults = [...filteredCommon, ...(dbResults || [])]
      setSearchResults(combinedResults)
    } catch {
      toast.error('Error searching foods')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async () => {
    setLoading(true)
    try {
      // In a real app, you would send this to a food recognition API
      // For now, we'll simulate food detection
      toast.success('Food detected! Please search for the specific item.')
      
      // Simulate some common detected foods
      const simulatedDetections = ['apple', 'banana', 'chicken', 'rice']
      const randomFood = simulatedDetections[Math.floor(Math.random() * simulatedDetections.length)]
      setSearchQuery(randomFood)
      await searchFoods(randomFood)
    } catch {
      toast.error('Error processing image')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload()
    }
  }

  const calculateNutrition = (food: FoodItem, grams: number) => {
    const factor = grams / 100
    return {
      calories: Math.round(food.calories_per_100g * factor),
      protein: food.protein_per_100g ? Math.round(food.protein_per_100g * factor * 10) / 10 : 0,
      carbs: food.carbs_per_100g ? Math.round(food.carbs_per_100g * factor * 10) / 10 : 0,
      fat: food.fat_per_100g ? Math.round(food.fat_per_100g * factor * 10) / 10 : 0
    }
  }

  const handleAddFood = () => {
    if (!selectedFood) return
    
    onFoodAdd(selectedFood, quantity, mealType)
    setSelectedFood(null)
    setQuantity(100)
    setSearchQuery('')
    setSearchResults([])
    toast.success('Food added successfully!')
  }

  return (
    <div className="space-y-4">
      {/* Search and Camera Controls */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              searchFoods(e.target.value)
            }}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        
        <Button
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          loading={loading}
        >
          <Camera className="w-4 h-4" />
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((food) => (
                <div
                  key={food.id}
                  className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedFood(food)}
                >
                  <div>
                    <h3 className="font-medium">{food.name}</h3>
                    <p className="text-sm text-foreground-muted">
                      {food.calories_per_100g} cal per 100g
                      {food.brand && ` • ${food.brand}`}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Add Common Foods */}
      {!searchQuery && searchResults.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Add</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {commonFoods.slice(0, 8).map((food) => (
                <button
                  key={food.id}
                  className="p-3 bg-background-tertiary rounded-lg hover:bg-gray-700 transition-colors text-left"
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="font-medium text-sm">{food.name}</div>
                  <div className="text-xs text-foreground-muted">
                    {food.calories_per_100g} cal
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Food Details */}
      {selectedFood && (
        <Card className="border-primary/50">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-lg">{selectedFood.name}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFood(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Quantity (grams)
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>

              {quantity > 0 && (
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h4 className="font-medium mb-2">Nutrition for {quantity}g</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-foreground-muted">Calories</div>
                      <div className="font-semibold text-primary">
                        {calculateNutrition(selectedFood, quantity).calories}
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground-muted">Protein</div>
                      <div className="font-semibold">
                        {calculateNutrition(selectedFood, quantity).protein}g
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground-muted">Carbs</div>
                      <div className="font-semibold">
                        {calculateNutrition(selectedFood, quantity).carbs}g
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground-muted">Fat</div>
                      <div className="font-semibold">
                        {calculateNutrition(selectedFood, quantity).fat}g
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddFood}
                className="w-full"
                disabled={quantity <= 0}
              >
                Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}