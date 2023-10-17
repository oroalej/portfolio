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
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      daydreams: {
        Row: {
          aperture: number
          created_at: string
          description: string
          file_id: string | null
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
      media_details: {
        Row: {
          created_at: string
          id: string
          name: string
          source_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          source_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_details_source_id_fkey"
            columns: ["source_id"]
            referencedRelation: "sources"
            referencedColumns: ["id"]
          }
        ]
      }
      quotes: {
        Row: {
          category_id: string
          source_id: string
          media_detail_id: string
          content: string
          created_at: string
          id: string
        }
        Insert: {
          category_id: string
          source_id: string
          media_detail_id: string
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          category_id: string
          source_id: string
          media_detail_id: string
          content: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      sources: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sources_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
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
