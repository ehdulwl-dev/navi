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
      TB_CL_QUE: {
        Row: {
          answer: string | null
          id: number
          question: string
          userid: number
        }
        Insert: {
          answer?: string | null
          id?: number
          question: string
          userid: number
        }
        Update: {
          answer?: string | null
          id?: number
          question?: string
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tb_cl_que_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_CL_UQUE: {
        Row: {
          action: string
          id: number
          modified: string | null
          questionid: number
          userid: number
        }
        Insert: {
          action: string
          id?: number
          modified?: string | null
          questionid: number
          userid: number
        }
        Update: {
          action?: string
          id?: number
          modified?: string | null
          questionid?: number
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_question"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "TB_CL_QUE"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tb_cl_uque_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_CL_WORD: {
        Row: {
          created_at: string | null
          id: number
          keyword1: string | null
          keyword2: string | null
          keyword3: string | null
          userid: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          keyword1?: string | null
          keyword2?: string | null
          keyword3?: string | null
          userid: number
        }
        Update: {
          created_at?: string | null
          id?: number
          keyword1?: string | null
          keyword2?: string | null
          keyword3?: string | null
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tb_cl_words_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_CV_CRTF: {
        Row: {
          crtfname: string | null
          grade: string | null
          id: number
          issueddate: string | null
          organization: string | null
          userid: string
        }
        Insert: {
          crtfname?: string | null
          grade?: string | null
          id?: number
          issueddate?: string | null
          organization?: string | null
          userid: string
        }
        Update: {
          crtfname?: string | null
          grade?: string | null
          id?: number
          issueddate?: string | null
          organization?: string | null
          userid?: string
        }
        Relationships: []
      }
      TB_CV_EDU: {
        Row: {
          admsyear: number | null
          created_at: string | null
          edutype: string
          grdstatus: string | null
          grdyear: number | null
          id: number
          major: string | null
          schoolname: string | null
          userid: number
        }
        Insert: {
          admsyear?: number | null
          created_at?: string | null
          edutype: string
          grdstatus?: string | null
          grdyear?: number | null
          id?: number
          major?: string | null
          schoolname?: string | null
          userid: number
        }
        Update: {
          admsyear?: number | null
          created_at?: string | null
          edutype?: string
          grdstatus?: string | null
          grdyear?: number | null
          id?: number
          major?: string | null
          schoolname?: string | null
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_CV_EXP: {
        Row: {
          achievement: string | null
          company: string | null
          created_at: string | null
          employmenttype: string | null
          enterdate: string | null
          id: number
          position: string | null
          retiredate: string | null
          status: string | null
          userid: number
        }
        Insert: {
          achievement?: string | null
          company?: string | null
          created_at?: string | null
          employmenttype?: string | null
          enterdate?: string | null
          id?: number
          position?: string | null
          retiredate?: string | null
          status?: string | null
          userid: number
        }
        Update: {
          achievement?: string | null
          company?: string | null
          created_at?: string | null
          employmenttype?: string | null
          enterdate?: string | null
          id?: number
          position?: string | null
          retiredate?: string | null
          status?: string | null
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_CV_SKILL: {
        Row: {
          accountprg: boolean | null
          created_at: string | null
          doc: boolean | null
          excel: boolean | null
          id: number
          otherskill: string | null
          ppt: boolean | null
          userid: string
        }
        Insert: {
          accountprg?: boolean | null
          created_at?: string | null
          doc?: boolean | null
          excel?: boolean | null
          id?: number
          otherskill?: string | null
          ppt?: boolean | null
          userid: string
        }
        Update: {
          accountprg?: boolean | null
          created_at?: string | null
          doc?: boolean | null
          excel?: boolean | null
          id?: number
          otherskill?: string | null
          ppt?: boolean | null
          userid?: string
        }
        Relationships: []
      }
      TB_CV_USER: {
        Row: {
          address: string | null
          birthdate: string | null
          created_at: string | null
          disability: boolean | null
          disabilityfile: string | null
          email: string | null
          id: number
          name: string | null
          phone: string | null
          userid: number
          veteran: boolean | null
          veteranfile: string | null
          vulnerable: boolean | null
          vulnerablefile: string | null
        }
        Insert: {
          address?: string | null
          birthdate?: string | null
          created_at?: string | null
          disability?: boolean | null
          disabilityfile?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
          userid: number
          veteran?: boolean | null
          veteranfile?: string | null
          vulnerable?: boolean | null
          vulnerablefile?: string | null
        }
        Update: {
          address?: string | null
          birthdate?: string | null
          created_at?: string | null
          disability?: boolean | null
          disabilityfile?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
          userid?: number
          veteran?: boolean | null
          veteranfile?: string | null
          vulnerable?: boolean | null
          vulnerablefile?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tb_cv_user_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_EDUCATIONS: {
        Row: {
          age_co_nm: string | null
          created_at: string | null
          edc_amount_at_nm: string | null
          edc_begin_de_dt: string | null
          edc_end_de_dt: string | null
          edc_nm: string | null
          edc_sn: string | null
          edc_time_hm: string | null
          id: number
          lctrum_info_cn: string | null
          matrl_amount_at_nm: string | null
          psncpa_co: number | null
          rcrit_begin_de_dt: string | null
          rcrit_end_de_dt: string | null
          sex_qualf_cn: string | null
          sttus_nm: string | null
        }
        Insert: {
          age_co_nm?: string | null
          created_at?: string | null
          edc_amount_at_nm?: string | null
          edc_begin_de_dt?: string | null
          edc_end_de_dt?: string | null
          edc_nm?: string | null
          edc_sn?: string | null
          edc_time_hm?: string | null
          id?: number
          lctrum_info_cn?: string | null
          matrl_amount_at_nm?: string | null
          psncpa_co?: number | null
          rcrit_begin_de_dt?: string | null
          rcrit_end_de_dt?: string | null
          sex_qualf_cn?: string | null
          sttus_nm?: string | null
        }
        Update: {
          age_co_nm?: string | null
          created_at?: string | null
          edc_amount_at_nm?: string | null
          edc_begin_de_dt?: string | null
          edc_end_de_dt?: string | null
          edc_nm?: string | null
          edc_sn?: string | null
          edc_time_hm?: string | null
          id?: number
          lctrum_info_cn?: string | null
          matrl_amount_at_nm?: string | null
          psncpa_co?: number | null
          rcrit_begin_de_dt?: string | null
          rcrit_end_de_dt?: string | null
          sex_qualf_cn?: string | null
          sttus_nm?: string | null
        }
        Relationships: []
      }
      TB_JOB_ADDITIONAL_INFO: {
        Row: {
          analysisid: number
          id: number
          inputtype: string | null
          inputvalue: boolean | null
        }
        Insert: {
          analysisid: number
          id?: never
          inputtype?: string | null
          inputvalue?: boolean | null
        }
        Update: {
          analysisid?: number
          id?: never
          inputtype?: string | null
          inputvalue?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_analysis_input"
            columns: ["analysisid"]
            isOneToOne: false
            referencedRelation: "TB_JOB_ANALYSIS"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_JOB_ANALYSIS: {
        Row: {
          anlysscore: number | null
          created_at: string | null
          id: number
          jobid: number
          updated_at: string | null
          userid: number
        }
        Insert: {
          anlysscore?: number | null
          created_at?: string | null
          id?: number
          jobid: number
          updated_at?: string | null
          userid: number
        }
        Update: {
          anlysscore?: number | null
          created_at?: string | null
          id?: number
          jobid?: number
          updated_at?: string | null
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "TB_USER"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_JOB_MATCHED_CONDITIONS: {
        Row: {
          analysisid: number
          conditionname: string | null
          conditiontype: string | null
          id: number
          relatedexp: boolean | null
          weight: number | null
        }
        Insert: {
          analysisid: number
          conditionname?: string | null
          conditiontype?: string | null
          id?: never
          relatedexp?: boolean | null
          weight?: number | null
        }
        Update: {
          analysisid?: number
          conditionname?: string | null
          conditiontype?: string | null
          id?: never
          relatedexp?: boolean | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_analysis"
            columns: ["analysisid"]
            isOneToOne: false
            referencedRelation: "TB_JOB_ANALYSIS"
            referencedColumns: ["id"]
          },
        ]
      }
      TB_JOBS: {
        Row: {
          career_required: string | null
          company: string | null
          description: string | null
          education_required: string | null
          employment_type: string | null
          holiday: string | null
          id: string
          insurance: string | null
          location: string | null
          manager_name: string | null
          manager_org: string | null
          manager_phone: string | null
          papers_required: string | null
          receipt_close: string | null
          receipt_method: string | null
          reg_date: string | null
          selection_method: string | null
          summary: string | null
          title: string | null
          wage: string | null
          week_hours: number | null
          work_address: string | null
          work_time: string | null
        }
        Insert: {
          career_required?: string | null
          company?: string | null
          description?: string | null
          education_required?: string | null
          employment_type?: string | null
          holiday?: string | null
          id: string
          insurance?: string | null
          location?: string | null
          manager_name?: string | null
          manager_org?: string | null
          manager_phone?: string | null
          papers_required?: string | null
          receipt_close?: string | null
          receipt_method?: string | null
          reg_date?: string | null
          selection_method?: string | null
          summary?: string | null
          title?: string | null
          wage?: string | null
          week_hours?: number | null
          work_address?: string | null
          work_time?: string | null
        }
        Update: {
          career_required?: string | null
          company?: string | null
          description?: string | null
          education_required?: string | null
          employment_type?: string | null
          holiday?: string | null
          id?: string
          insurance?: string | null
          location?: string | null
          manager_name?: string | null
          manager_org?: string | null
          manager_phone?: string | null
          papers_required?: string | null
          receipt_close?: string | null
          receipt_method?: string | null
          reg_date?: string | null
          selection_method?: string | null
          summary?: string | null
          title?: string | null
          wage?: string | null
          week_hours?: number | null
          work_address?: string | null
          work_time?: string | null
        }
        Relationships: []
      }
      TB_USER: {
        Row: {
          address: string | null
          birthdate: string | null
          email: string | null
          id: number
          name: string
          personality: string | null
          phone: string | null
          preferjob: string | null
          PreferJob: string | null
          preferlocate: string | null
          preferLocate: string | null
          prefertime: string | null
        }
        Insert: {
          address?: string | null
          birthdate?: string | null
          email?: string | null
          id?: number
          name: string
          personality?: string | null
          phone?: string | null
          preferjob?: string | null
          PreferJob?: string | null
          preferlocate?: string | null
          preferLocate?: string | null
          prefertime?: string | null
        }
        Update: {
          address?: string | null
          birthdate?: string | null
          email?: string | null
          id?: number
          name?: string
          personality?: string | null
          phone?: string | null
          preferjob?: string | null
          PreferJob?: string | null
          preferlocate?: string | null
          preferLocate?: string | null
          prefertime?: string | null
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
    Enums: {},
  },
} as const
