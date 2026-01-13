// Database Types

export interface Note {
  id: string;
  user_id: string;
  title: string;
  type: "pdf" | "youtube" | "audio" | "text" | "link" | "website" | "docx";
  summary_markdown: string | null;
  flashcards: any[] | null;
  folder_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  created_at: string;
  updated_at: string;
}

