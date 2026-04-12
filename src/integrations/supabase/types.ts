export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          is_active: boolean | null
          permissions: Json | null
          role_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      client_error_logs: {
        Row: {
          component_stack: string | null
          created_at: string
          error_message: string
          error_stack: string | null
          id: string
          metadata: Json | null
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          component_stack?: string | null
          created_at?: string
          error_message: string
          error_stack?: string | null
          id?: string
          metadata?: Json | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          component_stack?: string | null
          created_at?: string
          error_message?: string
          error_stack?: string | null
          id?: string
          metadata?: Json | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_notifications: {
        Row: {
          email_body: string | null
          email_subject: string | null
          email_to: string
          id: string
          member_id: string | null
          notification_type: string
          sent_at: string | null
          status: string | null
        }
        Insert: {
          email_body?: string | null
          email_subject?: string | null
          email_to: string
          id?: string
          member_id?: string | null
          notification_type: string
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          email_body?: string | null
          email_subject?: string | null
          email_to?: string
          id?: string
          member_id?: string | null
          notification_type?: string
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_notifications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_email_notifications_member"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      email_whitelist: {
        Row: {
          added_by: string | null
          created_at: string | null
          email: string
          id: string
          invitation_sent_date: string | null
          is_invited: boolean | null
          last_reminder_sent_at: string | null
          notes: string | null
          nurturing_day1_sent: boolean | null
          nurturing_day1_sent_at: string | null
          nurturing_day3_sent: boolean | null
          nurturing_day3_sent_at: string | null
          signup_reminder_count: number | null
          subscription_type: string | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          email: string
          id?: string
          invitation_sent_date?: string | null
          is_invited?: boolean | null
          last_reminder_sent_at?: string | null
          notes?: string | null
          nurturing_day1_sent?: boolean | null
          nurturing_day1_sent_at?: string | null
          nurturing_day3_sent?: boolean | null
          nurturing_day3_sent_at?: string | null
          signup_reminder_count?: number | null
          subscription_type?: string | null
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          email?: string
          id?: string
          invitation_sent_date?: string | null
          is_invited?: boolean | null
          last_reminder_sent_at?: string | null
          notes?: string | null
          nurturing_day1_sent?: boolean | null
          nurturing_day1_sent_at?: string | null
          nurturing_day3_sent?: boolean | null
          nurturing_day3_sent_at?: string | null
          signup_reminder_count?: number | null
          subscription_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_whitelist_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_email_whitelist_added_by"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_access_log: {
        Row: {
          access_time: string | null
          id: string
          invite_link: string
          ip_address: unknown
          user_agent: string | null
        }
        Insert: {
          access_time?: string | null
          id?: string
          invite_link: string
          ip_address?: unknown
          user_agent?: string | null
        }
        Update: {
          access_time?: string | null
          id?: string
          invite_link?: string
          ip_address?: unknown
          user_agent?: string | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          accepted_at: string | null
          attempt_count: number | null
          expires_at: string | null
          id: string
          invitation_token: string | null
          invite_link: string | null
          invited_email: string
          invitee_reminder_sent_at: string | null
          inviter_id: string
          inviter_reminder_sent_at: string | null
          last_updated_at: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          accepted_at?: string | null
          attempt_count?: number | null
          expires_at?: string | null
          id?: string
          invitation_token?: string | null
          invite_link?: string | null
          invited_email: string
          invitee_reminder_sent_at?: string | null
          inviter_id: string
          inviter_reminder_sent_at?: string | null
          last_updated_at?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          accepted_at?: string | null
          attempt_count?: number | null
          expires_at?: string | null
          id?: string
          invitation_token?: string | null
          invite_link?: string | null
          invited_email?: string
          invitee_reminder_sent_at?: string | null
          inviter_id?: string
          inviter_reminder_sent_at?: string | null
          last_updated_at?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_invitations_inviter"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaign_registrations: {
        Row: {
          campaign_id: string
          created_at: string | null
          email: string
          id: string
          invite_link: string | null
          invited_at: string | null
          name: string
          notes: string | null
          rejection_reason: string | null
          source: string
          status: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          email: string
          id?: string
          invite_link?: string | null
          invited_at?: string | null
          name: string
          notes?: string | null
          rejection_reason?: string | null
          source: string
          status?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          email?: string
          id?: string
          invite_link?: string | null
          invited_at?: string | null
          name?: string
          notes?: string | null
          rejection_reason?: string | null
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          created_at: string | null
          description: string | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          max_slots_per_source: number | null
          name: string
          starts_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id: string
          is_active?: boolean | null
          max_slots_per_source?: number | null
          name: string
          starts_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          max_slots_per_source?: number | null
          name?: string
          starts_at?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          appreciation_email_sent: boolean | null
          beacons_customer_id: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          invited_by: string | null
          is_trial_member: boolean | null
          last_invite_sent_date: string | null
          subscription_end_date: string | null
          subscription_source: string | null
          subscription_start_date: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier: string | null
          trial_end_date: string | null
          trial_expired_message_shown: boolean | null
          trial_warning_sent: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          appreciation_email_sent?: boolean | null
          beacons_customer_id?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          invited_by?: string | null
          is_trial_member?: boolean | null
          last_invite_sent_date?: string | null
          subscription_end_date?: string | null
          subscription_source?: string | null
          subscription_start_date?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier?: string | null
          trial_end_date?: string | null
          trial_expired_message_shown?: boolean | null
          trial_warning_sent?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          appreciation_email_sent?: boolean | null
          beacons_customer_id?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          invited_by?: string | null
          is_trial_member?: boolean | null
          last_invite_sent_date?: string | null
          subscription_end_date?: string | null
          subscription_source?: string | null
          subscription_start_date?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier?: string | null
          trial_end_date?: string | null
          trial_expired_message_shown?: boolean | null
          trial_warning_sent?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      private_sitting_bookings: {
        Row: {
          additional_info: string | null
          agreed_to_terms: boolean | null
          booking_date: string | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          paid_at: string | null
          payment_status: string | null
          sitting_type: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string | null
          zoom_link: string | null
        }
        Insert: {
          additional_info?: string | null
          agreed_to_terms?: boolean | null
          booking_date?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          paid_at?: string | null
          payment_status?: string | null
          sitting_type: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          zoom_link?: string | null
        }
        Update: {
          additional_info?: string | null
          agreed_to_terms?: boolean | null
          booking_date?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          paid_at?: string | null
          payment_status?: string | null
          sitting_type?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          zoom_link?: string | null
        }
        Relationships: []
      }
      rpc_rate_limits: {
        Row: {
          called_at: string
          client_ip: string
          function_name: string
          id: number
        }
        Insert: {
          called_at?: string
          client_ip: string
          function_name: string
          id?: number
        }
        Update: {
          called_at?: string
          client_ip?: string
          function_name?: string
          id?: number
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      session_recordings: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          session_date: string | null
          title: string
          updated_at: string
          upload_date: string
          youtube_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          session_date?: string | null
          title: string
          updated_at?: string
          upload_date?: string
          youtube_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          session_date?: string | null
          title?: string
          updated_at?: string
          upload_date?: string
          youtube_id?: string | null
        }
        Relationships: []
      }
      sync_logs: {
        Row: {
          deactivated: number
          deactivated_emails: string[] | null
          details: Json | null
          error_details: Json | null
          errors: number
          id: string
          production_subs: number
          skipped: number
          synced: number
          synced_at: string
          total_stripe: number
          triggered_by: string | null
          unique_customers: number
        }
        Insert: {
          deactivated?: number
          deactivated_emails?: string[] | null
          details?: Json | null
          error_details?: Json | null
          errors?: number
          id?: string
          production_subs?: number
          skipped?: number
          synced?: number
          synced_at?: string
          total_stripe?: number
          triggered_by?: string | null
          unique_customers?: number
        }
        Update: {
          deactivated?: number
          deactivated_emails?: string[] | null
          details?: Json | null
          error_details?: Json | null
          errors?: number
          id?: string
          production_subs?: number
          skipped?: number
          synced?: number
          synced_at?: string
          total_stripe?: number
          triggered_by?: string | null
          unique_customers?: number
        }
        Relationships: []
      }
      try_for_free_registrations: {
        Row: {
          admin_notification_sent: boolean | null
          admin_notification_sent_at: string | null
          attended: boolean | null
          confirmation_email_sent: boolean | null
          confirmation_email_sent_at: string | null
          converted_to_paid: boolean | null
          created_at: string | null
          email: string
          follow_up_email_sent: boolean | null
          follow_up_email_sent_at: string | null
          full_name: string
          how_heard_about_us: string | null
          id: string
          ip_address: string | null
          registered_at: string | null
          session_date: string
          session_id: string
          session_title: string
          updated_at: string | null
          user_agent: string | null
          zoom_link_email_sent: boolean | null
          zoom_link_email_sent_at: string | null
        }
        Insert: {
          admin_notification_sent?: boolean | null
          admin_notification_sent_at?: string | null
          attended?: boolean | null
          confirmation_email_sent?: boolean | null
          confirmation_email_sent_at?: string | null
          converted_to_paid?: boolean | null
          created_at?: string | null
          email: string
          follow_up_email_sent?: boolean | null
          follow_up_email_sent_at?: string | null
          full_name: string
          how_heard_about_us?: string | null
          id?: string
          ip_address?: string | null
          registered_at?: string | null
          session_date: string
          session_id: string
          session_title: string
          updated_at?: string | null
          user_agent?: string | null
          zoom_link_email_sent?: boolean | null
          zoom_link_email_sent_at?: string | null
        }
        Update: {
          admin_notification_sent?: boolean | null
          admin_notification_sent_at?: string | null
          attended?: boolean | null
          confirmation_email_sent?: boolean | null
          confirmation_email_sent_at?: string | null
          converted_to_paid?: boolean | null
          created_at?: string | null
          email?: string
          follow_up_email_sent?: boolean | null
          follow_up_email_sent_at?: string | null
          full_name?: string
          how_heard_about_us?: string | null
          id?: string
          ip_address?: string | null
          registered_at?: string | null
          session_date?: string
          session_id?: string
          session_title?: string
          updated_at?: string | null
          user_agent?: string | null
          zoom_link_email_sent?: boolean | null
          zoom_link_email_sent_at?: string | null
        }
        Relationships: []
      }
      upcoming_sessions: {
        Row: {
          access_token: string | null
          created_at: string
          created_by: string | null
          description: string | null
          expires_at: string | null
          guest_teacher_name: string | null
          has_guest_teacher: boolean
          id: string
          is_active: boolean
          session_date: string
          session_time: string
          title: string
          updated_at: string
          zoom_link: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          guest_teacher_name?: string | null
          has_guest_teacher?: boolean
          id?: string
          is_active?: boolean
          session_date: string
          session_time: string
          title: string
          updated_at?: string
          zoom_link: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          guest_teacher_name?: string | null
          has_guest_teacher?: boolean
          id?: string
          is_active?: boolean
          session_date?: string
          session_time?: string
          title?: string
          updated_at?: string
          zoom_link?: string
        }
        Relationships: []
      }
    }
    Views: {
      invitation_reminder_status: {
        Row: {
          days_since_sent: number | null
          days_until_expiry: number | null
          expires_at: string | null
          id: string | null
          invited_email: string | null
          invitee_reminder_sent_at: string | null
          inviter_email: string | null
          inviter_name: string | null
          inviter_reminder_sent_at: string | null
          reminder_status: string | null
          sent_at: string | null
          status: string | null
        }
        Relationships: []
      }
      nurturing_email_queue: {
        Row: {
          email: string | null
          hours_since_whitelisted: number | null
          id: string | null
          nurturing_day1_sent: boolean | null
          nurturing_day1_sent_at: string | null
          nurturing_day3_sent: boolean | null
          nurturing_day3_sent_at: string | null
          nurturing_status: string | null
          subscription_type: string | null
          whitelisted_at: string | null
        }
        Relationships: []
      }
      pending_signups: {
        Row: {
          days_since_whitelisted: number | null
          email: string | null
          id: string | null
          is_invited: boolean | null
          last_reminder_sent_at: string | null
          notes: string | null
          reminder_status: string | null
          signup_reminder_count: number | null
          subscription_type: string | null
          whitelisted_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_count_active_members: { Args: never; Returns: number }
      admin_get_inactive_members: {
        Args: never
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_trial_member: boolean
          subscription_source: string
          subscription_status: string
          subscription_tier: string
          trial_end_date: string
        }[]
      }
      admin_get_pending_signups: {
        Args: { search_term?: string }
        Returns: {
          days_since_whitelisted: number
          email: string
          id: string
          last_reminder_sent_at: string
          notes: string
          reminder_status: string
          signup_reminder_count: number
          subscription_type: string
          whitelisted_at: string
        }[]
      }
      admin_get_sync_logs: {
        Args: { log_limit?: number }
        Returns: {
          deactivated: number
          deactivated_emails: string[]
          errors: number
          id: string
          production_subs: number
          skipped: number
          synced: number
          synced_at: string
          total_stripe: number
          triggered_by: string
          unique_customers: number
        }[]
      }
      admin_search_members: {
        Args: { search_email: string }
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_trial_member: boolean
          subscription_source: string
          subscription_status: string
          subscription_tier: string
          trial_end_date: string
        }[]
      }
      admin_update_member_subscription: {
        Args: {
          member_email: string
          new_end_date: string
          new_source?: string
          new_status: string
          new_tier: string
        }
        Returns: {
          message: string
          success: boolean
          updated_email: string
        }[]
      }
      can_send_invitation: { Args: { member_email: string }; Returns: boolean }
      check_email_allowed: {
        Args: { email_to_check: string }
        Returns: boolean
      }
      check_email_in_whitelist: {
        Args: { email_to_check: string }
        Returns: boolean
      }
      check_email_whitelist_status: {
        Args: { email_to_check: string }
        Returns: Json
      }
      check_trial_expiry: { Args: never; Returns: undefined }
      check_try_for_free_eligibility: {
        Args: { p_email: string; p_ip_address: string }
        Returns: {
          is_eligible: boolean
          reason: string
        }[]
      }
      cleanup_invitation_data: {
        Args: { invited_email_param: string; inviter_email_param: string }
        Returns: Json
      }
      cleanup_old_audit_logs: { Args: never; Returns: undefined }
      cleanup_rpc_rate_limits: { Args: never; Returns: undefined }
      create_test_trial_member: {
        Args: {
          days_until_expiry?: number
          test_email: string
          test_name?: string
        }
        Returns: Json
      }
      cron_invoke_edge_function: {
        Args: { function_name: string; request_body?: Json }
        Returns: number
      }
      current_user_email: { Args: never; Returns: string }
      debug_user_creation: { Args: never; Returns: Json }
      delete_session: { Args: { session_id: string }; Returns: Json }
      detect_suspicious_patterns: {
        Args: never
        Returns: {
          details: Json
          pattern_type: string
          severity: string
        }[]
      }
      get_account_health_data: {
        Args: never
        Returns: {
          account_created_at: string
          account_status: string
          email: string
          email_confirmed: boolean
          email_confirmed_at: string
          failed_login_count: number
          full_name: string
          is_trial_member: boolean
          last_login_at: string
          last_password_reset_at: string
          login_count: number
          password_reset_count: number
          subscription_status: string
          trial_end_date: string
          user_id: string
        }[]
      }
      get_admin_notification_stats: { Args: never; Returns: Json }
      get_admin_permissions: { Args: { check_user_id?: string }; Returns: Json }
      get_admin_upcoming_sessions: { Args: never; Returns: Json }
      get_auth_user_id_by_email: {
        Args: { user_email: string }
        Returns: string
      }
      get_eligible_try_for_free_sessions: {
        Args: never
        Returns: {
          datetime_sweden: string
          description: string
          id: string
          is_eligible: boolean
          registration_deadline: string
          time_until_deadline: string
          title: string
          zoom_link: string
        }[]
      }
      get_expired_trial_members: { Args: never; Returns: Json }
      get_invitation_by_link: { Args: { link_param: string }; Returns: Json }
      get_invitation_reminder_status: {
        Args: never
        Returns: {
          days_since_sent: number
          days_until_expiry: number
          expires_at: string
          id: string
          invited_email: string
          invitee_reminder_sent_at: string
          inviter_email: string
          inviter_name: string
          inviter_reminder_sent_at: string
          reminder_status: string
          sent_at: string
          status: string
        }[]
      }
      get_invitations_needing_invitee_reminder: {
        Args: never
        Returns: {
          days_since_sent: number
          expires_at: string
          invitation_id: string
          invitation_token: string
          invited_email: string
          inviter_email: string
          inviter_id: string
          inviter_name: string
          sent_at: string
        }[]
      }
      get_invitations_needing_inviter_reminder: {
        Args: never
        Returns: {
          days_since_sent: number
          expires_at: string
          invitation_id: string
          invitation_token: string
          invited_email: string
          inviter_email: string
          inviter_id: string
          inviter_name: string
          sent_at: string
        }[]
      }
      get_invite_limit: { Args: { tier: string }; Returns: number }
      get_invite_status: { Args: { member_email: string }; Returns: Json }
      get_member_upcoming_sessions: { Args: never; Returns: Json }
      get_promo_campaign_status: {
        Args: { p_campaign_id: string; p_source: string }
        Returns: Json
      }
      get_promo_registrations: {
        Args: { p_campaign_id?: string }
        Returns: {
          campaign_id: string
          created_at: string
          email: string
          id: string
          invite_link: string
          invited_at: string
          name: string
          notes: string
          rejection_reason: string
          source: string
          status: string
        }[]
      }
      get_public_next_session_summary: { Args: never; Returns: Json }
      get_public_schedule: { Args: never; Returns: Json }
      get_recent_invites: {
        Args: { member_id: string }
        Returns: {
          sent_at: string
        }[]
      }
      get_secure_session_access: {
        Args: { member_email: string; session_id: string }
        Returns: Json
      }
      get_secure_trial_monitoring_data: {
        Args: never
        Returns: {
          days_remaining: number
          email: string
          full_name: string
          subscription_status: string
          trial_end_date: string
          trial_expired_message_shown: boolean
          trial_status: string
          trial_warning_sent: boolean
        }[]
      }
      get_trial_monitoring_data: {
        Args: never
        Returns: {
          days_remaining: number
          email: string
          full_name: string
          subscription_status: string
          trial_end_date: string
          trial_expired_message_shown: boolean
          trial_status: string
          trial_warning_sent: boolean
        }[]
      }
      get_try_for_free_registrations_admin: {
        Args: never
        Returns: {
          attended: boolean
          confirmation_email_sent: boolean
          converted_to_paid: boolean
          email: string
          follow_up_email_sent: boolean
          full_name: string
          how_heard_about_us: string
          id: string
          registered_at: string
          session_date: string
          session_title: string
          zoom_link_email_sent: boolean
        }[]
      }
      get_upcoming_sessions: { Args: never; Returns: Json }
      get_user_invitations: { Args: { user_email: string }; Returns: Json }
      hash_email: { Args: { raw_email: string }; Returns: string }
      is_admin: { Args: { check_user_id?: string }; Returns: boolean }
      log_security_event: {
        Args: {
          action_param: string
          details_param?: Json
          resource_id_param?: string
          resource_type_param: string
        }
        Returns: undefined
      }
      log_trial_activation_success: {
        Args: { trial_end_date: string; user_email: string; user_id: string }
        Returns: undefined
      }
      mark_invitee_reminder_sent: {
        Args: { invitation_id: string }
        Returns: undefined
      }
      mark_inviter_reminder_sent: {
        Args: { invitation_id: string }
        Returns: undefined
      }
      mark_nurturing_email_sent: {
        Args: { email_day: number; whitelist_email: string }
        Returns: Json
      }
      process_expired_invitations: { Args: never; Returns: Json }
      register_for_promo_campaign: {
        Args: {
          p_campaign_id: string
          p_email: string
          p_name: string
          p_source: string
        }
        Returns: Json
      }
      register_try_for_free: {
        Args: {
          p_email: string
          p_full_name: string
          p_how_heard_about_us?: string
          p_ip_address?: string
          p_session_id: string
          p_user_agent?: string
        }
        Returns: {
          message: string
          registration_id: string
          success: boolean
        }[]
      }
      reset_expired_invitation_cooldowns: { Args: never; Returns: undefined }
      secure_delete_user_data: {
        Args: { user_email: string }
        Returns: boolean
      }
      send_invitation: {
        Args: { invited_email: string; inviter_email: string }
        Returns: Json
      }
      send_try_for_free_followup_emails: {
        Args: never
        Returns: {
          email: string
          followup_sent_at: string
          full_name: string
          message: string
          registration_id: string
          session_datetime: string
          session_title: string
          success: boolean
        }[]
      }
      test_trigger_system: { Args: never; Returns: Json }
      trigger_invitation_reminders: { Args: never; Returns: Json }
      trigger_trial_notifications: { Args: never; Returns: Json }
      update_promo_registration: {
        Args: {
          p_invite_link?: string
          p_notes?: string
          p_registration_id: string
          p_status: string
        }
        Returns: Json
      }
      upsert_session:
        | {
            Args: {
              session_date?: string
              session_description?: string
              session_id?: string
              session_time?: string
              session_title?: string
              session_zoom_link?: string
            }
            Returns: Json
          }
        | {
            Args: {
              session_date?: string
              session_description?: string
              session_guest_teacher_name?: string
              session_has_guest_teacher?: boolean
              session_id?: string
              session_time?: string
              session_title?: string
              session_zoom_link?: string
            }
            Returns: Json
          }
      validate_email_domain: { Args: { email: string }; Returns: boolean }
      validate_invitation_access: {
        Args: { link_param: string; user_email: string }
        Returns: Json
      }
      validate_invitation_link: {
        Args: { link_param: string }
        Returns: boolean
      }
    }
    Enums: {
      subscription_status: "active" | "inactive" | "trial"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_status: ["active", "inactive", "trial"],
    },
  },
} as const
