export interface Profile {
  id: string
  display_name: string
  avatar_url?: string
  city?: string
  country?: string
  coins: number
  total_points: number
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  title: string
  description: string
  category_id?: string
  duration_minutes: number
  points: number
  bonus_description?: string
  bonus_multiplier?: number
  image_url?: string
  location?: string
  max_participants?: number
  current_participants: number
  event_date?: string
  created_by?: string
  created_at: string
  is_active: boolean
}

export interface Challenge {
  id: string
  title: string
  description: string
  icon?: string
  target_count: number
  points_reward: number
  xp_reward: number
  created_at: string
}

export interface UserChallenge {
  id: string
  user_id: string
  challenge_id: string
  current_count: number
  is_completed: boolean
  completed_at?: string
  created_at: string
  challenge?: Challenge
}

export interface Reward {
  id: string
  title: string
  description?: string
  coins_cost: number
  image_url?: string
  stock_quantity?: number
  is_active: boolean
  created_at: string
}

export interface Flashmob {
  id: string
  title: string
  description?: string
  event_time: string
  points: number
  is_active: boolean
  created_at: string
}

export interface HelpRequest {
  id: string
  title: string
  description: string
  requester_name: string
  requester_age?: number
  location: string
  distance_meters?: number
  points: number
  status: "open" | "accepted" | "completed" | "cancelled"
  created_by?: string
  accepted_by?: string
  created_at: string
  completed_at?: string
}
