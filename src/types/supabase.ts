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
          file_id: string
          id: string
          iso: number
          shutter_speed: number
          year: number
        }
        Insert: {
          aperture: number
          created_at?: string
          description: string
          file_id?: string | null
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
          file_id?: string | null
          id?: string
          image_path?: string
          iso?: number
          shutter_speed?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "daydreams_file_id_fkey"
            columns: ["file_id"]
            referencedRelation: "files"
            referencedColumns: ["id"]
          }
        ]
      }
      files: {
        Row: {
          bucket_name: string
          created_at: string
          duration: number | null
          height: number | null
          id: string
          name: string
          size: number
          storage_file_path: string
          type: string
          width: number | null
        }
        Insert: {
          bucket_name: string
          created_at?: string
          duration?: number | null
          height?: number | null
          id?: string
          name: string
          size: number
          storage_file_path: string
          type: string
          width?: number | null
        }
        Update: {
          bucket_name?: string
          created_at?: string
          duration?: number | null
          height?: number | null
          id?: string
          name?: string
          size?: number
          storage_file_path?: string
          type?: string
          width?: number | null
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
