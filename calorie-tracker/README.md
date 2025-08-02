# CalorieTracker - Black Themed Nutrition App

A fast, modern, and intuitive calorie tracking application with food scanning capabilities, personalized goal setting, and real-time synchronization. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### 🎯 Core Functionality
- **Food Scanning & Search**: Instantly scan food with camera or search from extensive database
- **Smart Goal Setting**: Personalized calorie targets based on height, weight, age, and fitness goals
- **Real-time Tracking**: Live updates across devices with instant synchronization
- **Macro Tracking**: Detailed protein, carbs, and fat monitoring
- **Meal Organization**: Separate tracking for breakfast, lunch, dinner, and snacks

### 🎨 Design & UX
- **Black Theme**: Sleek, modern dark interface optimized for all lighting conditions
- **Responsive Design**: Perfect experience on mobile, tablet, and desktop
- **Fast Performance**: Optimized for speed with minimal loading times
- **Intuitive Interface**: Easy-to-use with minimal learning curve

### 🔐 Authentication & Data
- **Secure Authentication**: Email/password login with Supabase Auth
- **Real-time Database**: Instant data sync across all devices
- **Data Privacy**: Secure cloud storage with user data protection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calorie-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the database setup (see Database Setup section)

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  height INTEGER,
  weight INTEGER,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active')),
  goal TEXT CHECK (goal IN ('lose', 'maintain', 'gain')),
  target_calories INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create foods table
CREATE TABLE foods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  calories_per_100g INTEGER NOT NULL,
  protein_per_100g DECIMAL,
  carbs_per_100g DECIMAL,
  fat_per_100g DECIMAL,
  brand TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_logs table
CREATE TABLE food_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  food_name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  protein DECIMAL,
  carbs DECIMAL,
  fat DECIMAL,
  quantity INTEGER DEFAULT 100,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')) NOT NULL,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Foods are viewable by everyone" ON foods FOR SELECT USING (true);

CREATE POLICY "Users can view own food logs" ON food_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own food logs" ON food_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own food logs" ON food_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own food logs" ON food_logs FOR DELETE USING (auth.uid() = user_id);

-- Insert some sample foods
INSERT INTO foods (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, category) VALUES
('Banana', 89, 1.1, 23, 0.3, 'Fruits'),
('Apple', 52, 0.3, 14, 0.2, 'Fruits'),
('Chicken Breast', 165, 31, 0, 3.6, 'Meat'),
('Rice (cooked)', 130, 2.7, 28, 0.3, 'Grains'),
('Broccoli', 34, 2.8, 7, 0.4, 'Vegetables'),
('Egg', 155, 13, 1.1, 11, 'Dairy'),
('Oats', 389, 17, 66, 7, 'Grains'),
('Salmon', 208, 20, 0, 13, 'Fish');
```

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom Design System
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📱 Usage Guide

### Getting Started
1. **Sign Up**: Create an account with email and password
2. **Set Profile**: Enter your height, weight, age, activity level, and goal
3. **Track Food**: Use the scanner or search to add foods to your meals
4. **Monitor Progress**: View your daily calorie and macro progress in real-time

### Food Tracking
- **Quick Add**: Select from common foods for instant logging
- **Search**: Find specific foods from our extensive database
- **Camera Scan**: Take a photo for food recognition (simulated)
- **Custom Quantities**: Adjust serving sizes in grams

### Goal Setting
The app calculates your daily calorie needs using the Mifflin-St Jeor equation:
- **Lose Weight**: 500 calorie deficit (1 lb/week loss)
- **Maintain Weight**: Maintenance calories
- **Gain Weight**: 500 calorie surplus (1 lb/week gain)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include screenshots and error messages if applicable

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ for better nutrition tracking
