export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: {
          assessment_date: string
          assessment_type: string
          assessor_id: string
          created_at: string
          id: string
          score: number | null
          status: Database["public"]["Enums"]["assessment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_date: string
          assessment_type: string
          assessor_id: string
          created_at?: string
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["assessment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_date?: string
          assessment_type?: string
          assessor_id?: string
          created_at?: string
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["assessment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      caregivers: {
        Row: {
          address: string | null
          availability: Json | null
          bio: string | null
          certification_level: string | null
          certifications_url: string[] | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          emergency_contacts: Json | null
          experience_year: number | null
          gender: string | null
          government_id_url: string | null
          id: string
          license_number: string | null
          preferred_work_type: string | null
          profession: string
          profile_picture_url: string | null
          resume_url: string | null
          specialty: string | null
        }
        Insert: {
          address?: string | null
          availability?: Json | null
          bio?: string | null
          certification_level?: string | null
          certifications_url?: string[] | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          emergency_contacts?: Json | null
          experience_year?: number | null
          gender?: string | null
          government_id_url?: string | null
          id: string
          license_number?: string | null
          preferred_work_type?: string | null
          profession: string
          profile_picture_url?: string | null
          resume_url?: string | null
          specialty?: string | null
        }
        Update: {
          address?: string | null
          availability?: Json | null
          bio?: string | null
          certification_level?: string | null
          certifications_url?: string[] | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          emergency_contacts?: Json | null
          experience_year?: number | null
          gender?: string | null
          government_id_url?: string | null
          id?: string
          license_number?: string | null
          preferred_work_type?: string | null
          profession?: string
          profile_picture_url?: string | null
          resume_url?: string | null
          specialty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_users_caregivers"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          certification_type: string
          created_at: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          status: Database["public"]["Enums"]["certification_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          certification_type: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          status?: Database["public"]["Enums"]["certification_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          certification_type?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          status?: Database["public"]["Enums"]["certification_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          created_at: string
          description: string
          id: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      institution_caregivers: {
        Row: {
          caregiver_id: string
          created_at: string
          id: string
          institution_id: string
          status: Database["public"]["Enums"]["institution_caregiver_status"]
          updated_at: string
        }
        Insert: {
          caregiver_id: string
          created_at?: string
          id?: string
          institution_id: string
          status?: Database["public"]["Enums"]["institution_caregiver_status"]
          updated_at?: string
        }
        Update: {
          caregiver_id?: string
          created_at?: string
          id?: string
          institution_id?: string
          status?: Database["public"]["Enums"]["institution_caregiver_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_caregivers_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_caregivers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          accreditation_files_url: string[] | null
          bio: string | null
          city: string
          contact_person_name: string
          contact_person_phone: string | null
          county: string
          created_at: string | null
          details: Json | null
          id: string
          institution_logo_url: string | null
          institution_name: string
          institution_type: string
          license_documents_url: string[] | null
          license_number: string | null
          linkedin_profile: string | null
          location: Json | null
          physical_address: string
          postal_code: string | null
          rating: number | null
          registration_certificate_url: string | null
          status: string | null
          website: string | null
          years_in_operation: number | null
        }
        Insert: {
          accreditation_files_url?: string[] | null
          bio?: string | null
          city: string
          contact_person_name: string
          contact_person_phone?: string | null
          county: string
          created_at?: string | null
          details?: Json | null
          id: string
          institution_logo_url?: string | null
          institution_name: string
          institution_type: string
          license_documents_url?: string[] | null
          license_number?: string | null
          linkedin_profile?: string | null
          location?: Json | null
          physical_address: string
          postal_code?: string | null
          rating?: number | null
          registration_certificate_url?: string | null
          status?: string | null
          website?: string | null
          years_in_operation?: number | null
        }
        Update: {
          accreditation_files_url?: string[] | null
          bio?: string | null
          city?: string
          contact_person_name?: string
          contact_person_phone?: string | null
          county?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          institution_logo_url?: string | null
          institution_name?: string
          institution_type?: string
          license_documents_url?: string[] | null
          license_number?: string | null
          linkedin_profile?: string | null
          location?: Json | null
          physical_address?: string
          postal_code?: string | null
          rating?: number | null
          registration_certificate_url?: string | null
          status?: string | null
          website?: string | null
          years_in_operation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_users_institutions"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_pages: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          slug: string
          title: string
          updated_at: string | null
          version: number
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          slug: string
          title: string
          updated_at?: string | null
          version?: number
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      licenses: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          license_number: string
          status: Database["public"]["Enums"]["license_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          license_number: string
          status?: Database["public"]["Enums"]["license_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          license_number?: string
          status?: Database["public"]["Enums"]["license_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "licenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_type: Database["public"]["Enums"]["payment_type"]
          status: Database["public"]["Enums"]["payment_status_enum"]
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_type: Database["public"]["Enums"]["payment_type"]
          status?: Database["public"]["Enums"]["payment_status_enum"]
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_type?: Database["public"]["Enums"]["payment_type"]
          status?: Database["public"]["Enums"]["payment_status_enum"]
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string
          id: string
          is_active: boolean | null
          last_login_at: string | null
          last_name: string | null
          linkedin_profile: string | null
          location: string | null
          metadata: Json | null
          onboarded: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["member_role"]
          status: Database["public"]["Enums"]["member_status"]
          surname: string | null
          updated_at: string | null
          username: string | null
          verified_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name: string
          id: string
          is_active?: boolean | null
          last_login_at?: string | null
          last_name?: string | null
          linkedin_profile?: string | null
          location?: string | null
          metadata?: Json | null
          onboarded?: boolean | null
          phone?: string | null
          role: Database["public"]["Enums"]["member_role"]
          status?: Database["public"]["Enums"]["member_status"]
          surname?: string | null
          updated_at?: string | null
          username?: string | null
          verified_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          last_name?: string | null
          linkedin_profile?: string | null
          location?: string | null
          metadata?: Json | null
          onboarded?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["member_role"]
          status?: Database["public"]["Enums"]["member_status"]
          surname?: string | null
          updated_at?: string | null
          username?: string | null
          verified_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      training_enrollments: {
        Row: {
          completion_date: string | null
          created_at: string
          id: string
          program_id: string
          status: Database["public"]["Enums"]["training_enrollment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          id?: string
          program_id: string
          status?: Database["public"]["Enums"]["training_enrollment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          id?: string
          program_id?: string
          status?: Database["public"]["Enums"]["training_enrollment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      training_programs: {
        Row: {
          created_at: string
          description: string
          id: string
          status: Database["public"]["Enums"]["training_program_status"]
          title: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          status?: Database["public"]["Enums"]["training_program_status"]
          title: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          status?: Database["public"]["Enums"]["training_program_status"]
          title?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_programs_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_file_url_to_application: {
        Args: { application_id: string; file_url: string }
        Returns: undefined
      }
      append_to_extra_document_urls: {
        Args: { application_id: string; file_url: string }
        Returns: undefined
      }
    }
    Enums: {
      assessment_status: "scheduled" | "completed" | "failed"
      certification_status: "pending" | "approved" | "rejected" | "expired"
      complaint_status: "open" | "in_progress" | "resolved" | "closed"
      institution_caregiver_status: "active" | "inactive"
      license_status: "pending" | "approved" | "rejected" | "expired"
      member_role:
        | "caregiver"
        | "institution"
        | "admin"
        | "assessor"
        | "trainer"
      member_status: "pending" | "active" | "suspended" | "rejected"
      payment_status_enum: "pending" | "completed" | "failed"
      payment_type: "license" | "certification" | "training"
      training_enrollment_status:
        | "enrolled"
        | "in_progress"
        | "completed"
        | "failed"
      training_program_status: "draft" | "published" | "archived"
      user_role: "caregiver" | "institution" | "admin" | "assessor" | "trainer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_status: ["scheduled", "completed", "failed"],
      certification_status: ["pending", "approved", "rejected", "expired"],
      complaint_status: ["open", "in_progress", "resolved", "closed"],
      institution_caregiver_status: ["active", "inactive"],
      license_status: ["pending", "approved", "rejected", "expired"],
      member_role: ["caregiver", "institution", "admin", "assessor", "trainer"],
      member_status: ["pending", "active", "suspended", "rejected"],
      payment_status_enum: ["pending", "completed", "failed"],
      payment_type: ["license", "certification", "training"],
      training_enrollment_status: [
        "enrolled",
        "in_progress",
        "completed",
        "failed",
      ],
      training_program_status: ["draft", "published", "archived"],
      user_role: ["caregiver", "institution", "admin", "assessor", "trainer"],
    },
  },
} as const
