export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      daydreams: {
        Row: {
          aperture: number;
          created_at: string;
          description: string;
          file_id: string | null;
          id: string;
          iso: number;
          shutter_speed: number;
          year: number;
        };
        Insert: {
          aperture: number;
          created_at?: string;
          description: string;
          file_id?: string | null;
          id?: string;
          iso: number;
          shutter_speed: number;
          year: number;
        };
        Update: {
          aperture?: number;
          created_at?: string;
          description?: string;
          file_id?: string | null;
          id?: string;
          iso?: number;
          shutter_speed?: number;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: "daydreams_file_id_fkey";
            columns: ["file_id"];
            isOneToOne: false;
            referencedRelation: "files";
            referencedColumns: ["id"];
          }
        ];
      };
      files: {
        Row: {
          bucket_name: string;
          category_id: string | null;
          created_at: string;
          duration: number | null;
          height: number | null;
          id: string;
          is_bookmarked: boolean;
          name: string;
          size: number;
          storage_file_path: string;
          type: string;
          width: number | null;
        };
        Insert: {
          bucket_name: string;
          category_id?: string | null;
          created_at?: string;
          duration?: number | null;
          height?: number | null;
          id?: string;
          is_bookmarked?: boolean;
          name: string;
          size: number;
          storage_file_path: string;
          type: string;
          width?: number | null;
        };
        Update: {
          bucket_name?: string;
          category_id?: string | null;
          created_at?: string;
          duration?: number | null;
          height?: number | null;
          id?: string;
          is_bookmarked?: boolean;
          name?: string;
          size?: number;
          storage_file_path?: string;
          type?: string;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "files_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          }
        ];
      };
      project_screenshots: {
        Row: {
          description: string | null;
          file_id: string;
          id: string;
          project_id: string;
          screenshot_order: number;
          title: string;
        };
        Insert: {
          description?: string | null;
          file_id: string;
          id?: string;
          project_id: string;
          screenshot_order: number;
          title: string;
        };
        Update: {
          description?: string | null;
          file_id?: string;
          id?: string;
          project_id?: string;
          screenshot_order?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_screenshots_file_id_fkey";
            columns: ["file_id"];
            isOneToOne: false;
            referencedRelation: "files";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_screenshots_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_skills: {
        Row: {
          created_at: string;
          id: string;
          project_id: string;
          skill_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          project_id: string;
          skill_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          project_id?: string;
          skill_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_skills_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_skills_skill_id_fkey";
            columns: ["skill_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          created_at: string;
          description: string;
          design_link: string | null;
          id: string;
          project_order: number;
          project_type_id: string;
          repository_link: string | null;
          title: string;
          website_link: string | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          design_link?: string | null;
          id?: string;
          project_order: number;
          project_type_id: string;
          repository_link?: string | null;
          title: string;
          website_link?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          design_link?: string | null;
          id?: string;
          project_order?: number;
          project_type_id?: string;
          repository_link?: string | null;
          title?: string;
          website_link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          }
        ];
      };
      quotes: {
        Row: {
          category_id: string;
          content: string;
          created_at: string;
          id: string;
          media_detail_id: string;
          source_id: string;
        };
        Insert: {
          category_id: string;
          content: string;
          created_at?: string;
          id?: string;
          media_detail_id?: string;
          source_id?: string;
        };
        Update: {
          category_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          media_detail_id?: string;
          source_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quotes_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quotes_media_detail_id_fkey";
            columns: ["media_detail_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quotes_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          }
        ];
      };
      term_taxonomy: {
        Row: {
          description: string | null;
          id: string;
          name: string;
          parent_id: string | null;
          term_id: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          name: string;
          parent_id?: string | null;
          term_id: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          name?: string;
          parent_id?: string | null;
          term_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "term_taxonomy_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "term_taxonomy";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "term_taxonomy_term_id_fkey";
            columns: ["term_id"];
            isOneToOne: false;
            referencedRelation: "terms";
            referencedColumns: ["id"];
          }
        ];
      };
      terms: {
        Row: {
          description: string | null;
          id: string;
          identifier: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          identifier?: number;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          identifier?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      store_project: {
        Args: {
          title: string;
          description: string;
          project_type_id: string;
          skills: string[];
          screenshots?: Database["public"]["CompositeTypes"]["screenshot_form"][];
          website_link?: string;
          design_link?: string;
          repository_link?: string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      screenshot_form: {
        title: string;
        screenshot_order: number;
        file_id: string;
      };
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
