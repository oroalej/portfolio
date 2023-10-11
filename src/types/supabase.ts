export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      daydreams: {
        Row: {
          aperture: number
          created_at: string
          description: string
          id: string
          image_path: string
          iso: number
          shutter_speed: number
          year: number
        }
        Insert: {
          aperture: number
          created_at?: string
          description: string
          id?: string
          image_path: string
          iso: number
          shutter_speed: number
          year: number
        }
        Update: {
          aperture?: number
          created_at?: string
          description?: string
          id?: string
          image_path?: string
          iso?: number
          shutter_speed?: number
          year?: number
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
