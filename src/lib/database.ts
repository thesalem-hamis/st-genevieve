export type Database = {
  public: {
    Tables: {
      payments: {
        Row: {
          id: string;
          reference: string;
          amount: number;
          currency: string;
          donor_name: string | null;
          email: string | null;
          designation: string | null;
          project_id: string | null;
          anonymous: boolean;
          status: string;
          paid_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          reference: string;
          amount: number;
          currency?: string;
          donor_name?: string | null;
          email?: string | null;
          designation?: string | null;
          project_id?: string | null;
          anonymous?: boolean;
          status?: string;
          paid_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          reference?: string;
          amount?: number;
          currency?: string;
          donor_name?: string | null;
          email?: string | null;
          designation?: string | null;
          project_id?: string | null;
          anonymous?: boolean;
          status?: string;
          paid_at?: string | null;
          created_at?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          cover_image: string | null;
          author_name: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          cover_image?: string | null;
          author_name?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          cover_image?: string | null;
          author_name?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          created_at?: string | null;
        };
      };
      volunteers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          location: string | null;
          interest: string | null;
          availability: string | null;
          experience: string | null;
          message: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          location?: string | null;
          interest?: string | null;
          availability?: string | null;
          experience?: string | null;
          message?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          location?: string | null;
          interest?: string | null;
          availability?: string | null;
          experience?: string | null;
          message?: string | null;
          created_at?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          tags: string[];
          summary: string | null;
          start_date: string | null;
          important_date: string | null;
          location: string | null;
          status: string;
          amount: number;
          cover_image: string | null;
          description: string | null;
          problem: string | null;
          solution: string | null;
          outcome: string | null;
          slug: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          tags?: string[];
          summary?: string | null;
          start_date?: string | null;
          important_date?: string | null;
          location?: string | null;
          status?: string;
          amount?: number;
          cover_image?: string | null;
          description?: string | null;
          problem?: string | null;
          solution?: string | null;
          outcome?: string | null;
          slug: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          tags?: string[];
          summary?: string | null;
          start_date?: string | null;
          important_date?: string | null;
          location?: string | null;
          status?: string;
          amount?: number;
          cover_image?: string | null;
          description?: string | null;
          problem?: string | null;
          solution?: string | null;
          outcome?: string | null;
          slug?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          caption: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          caption?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          image_url?: string;
          caption?: string | null;
          created_at?: string | null;
        };
      };
      project_testimonials: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          role: string | null;
          content: string;
          image: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          role?: string | null;
          content: string;
          image?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          role?: string | null;
          content?: string;
          image?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
