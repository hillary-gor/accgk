export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: "caregiver" | "institution" | "admin" | "assessor" | "trainer"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: "caregiver" | "institution" | "admin" | "assessor" | "trainer"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: "caregiver" | "institution" | "admin" | "assessor" | "trainer"
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          phone_number: string | null
          address: string | null
          profile_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          address?: string | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          address?: string | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      licenses: {
        Row: {
          id: string
          user_id: string
          license_number: string
          status: "pending" | "approved" | "rejected" | "expired"
          issue_date: string | null
          expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          status?: "pending" | "approved" | "rejected" | "expired"
          issue_date?: string | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          status?: "pending" | "approved" | "rejected" | "expired"
          issue_date?: string | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          user_id: string
          certification_type: string
          status: "pending" | "approved" | "rejected" | "expired"
          issue_date: string | null
          expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          certification_type: string
          status?: "pending" | "approved" | "rejected" | "expired"
          issue_date?: string | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          certification_type?: string
          status?: "pending" | "approved" | "rejected" | "expired"
          issue_date?: string | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          amount: number
          payment_type: "license" | "certification" | "training"
          status: "pending" | "completed" | "failed"
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          payment_type: "license" | "certification" | "training"
          status?: "pending" | "completed" | "failed"
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          payment_type?: "license" | "certification" | "training"
          status?: "pending" | "completed" | "failed"
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      training_programs: {
        Row: {
          id: string
          title: string
          description: string
          trainer_id: string
          status: "draft" | "published" | "archived"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          trainer_id: string
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          trainer_id?: string
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
        }
      }
      training_enrollments: {
        Row: {
          id: string
          user_id: string
          program_id: string
          status: "enrolled" | "in_progress" | "completed" | "failed"
          completion_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          program_id: string
          status?: "enrolled" | "in_progress" | "completed" | "failed"
          completion_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string
          status?: "enrolled" | "in_progress" | "completed" | "failed"
          completion_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          assessor_id: string
          assessment_type: string
          score: number | null
          status: "scheduled" | "completed" | "failed"
          assessment_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessor_id: string
          assessment_type: string
          score?: number | null
          status?: "scheduled" | "completed" | "failed"
          assessment_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessor_id?: string
          assessment_type?: string
          score?: number | null
          status?: "scheduled" | "completed" | "failed"
          assessment_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      institutions: {
        Row: {
          id: string
          user_id: string
          name: string
          registration_number: string
          address: string
          contact_person: string
          contact_email: string
          contact_phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          registration_number: string
          address: string
          contact_person: string
          contact_email: string
          contact_phone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          registration_number?: string
          address?: string
          contact_person?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          updated_at?: string
        }
      }
      institution_caregivers: {
        Row: {
          id: string
          institution_id: string
          caregiver_id: string
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          institution_id: string
          caregiver_id: string
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          institution_id?: string
          caregiver_id?: string
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      complaints: {
        Row: {
          id: string
          user_id: string
          subject: string
          description: string
          status: "open" | "in_progress" | "resolved" | "closed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          description: string
          status?: "open" | "in_progress" | "resolved" | "closed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          description?: string
          status?: "open" | "in_progress" | "resolved" | "closed"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
