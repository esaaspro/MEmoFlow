# 📁 Folders System - Setup Guide

## 📦 Supabase Database Setup

### 1. Create `folders` Table

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Create folders table
CREATE TABLE IF NOT EXISTS public.folders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own folders"
  ON public.folders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own folders"
  ON public.folders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders"
  ON public.folders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders"
  ON public.folders FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_folders_user_id ON public.folders(user_id);
CREATE INDEX idx_folders_created_at ON public.folders(created_at DESC);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_folders_updated_at
  BEFORE UPDATE ON public.folders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### 2. Update `notes` Table

Ajoutez la colonne `folder_id` à la table `notes` si elle n'existe pas déjà :

```sql
-- Add folder_id column to notes table
ALTER TABLE public.notes 
ADD COLUMN IF NOT EXISTS folder_id UUID REFERENCES public.folders(id) ON DELETE SET NULL;

-- Create index for folder_id
CREATE INDEX IF NOT EXISTS idx_notes_folder_id ON public.notes(folder_id);

-- Create index for notes without folder (folder_id IS NULL)
CREATE INDEX IF NOT EXISTS idx_notes_no_folder ON public.notes(user_id, folder_id) 
WHERE folder_id IS NULL;
```

---

## 🔄 Complete Flow

```
1. User visits /dashboard/notes
   ↓
2. Fetch folders and unfiled notes (folder_id IS NULL)
   ↓
3. Display folders grid + unfiled notes list
   ↓
4. User clicks "Nouveau Dossier"
   ↓
5. Modal opens → User enters folder name
   ↓
6. Create folder in Supabase
   ↓
7. Folder appears in grid
   ↓
8. User clicks on a folder
   ↓
9. Filter notes by folder_id
   ↓
10. Display notes in that folder
   ↓
11. User can move notes to/from folders via dropdown menu
```

---

## 📊 Database Structure

### Folders Table
```typescript
{
  id: "uuid",
  user_id: "auth-user-id",
  name: "Mathématiques",
  created_at: "2026-01-13T14:32:00Z",
  updated_at: "2026-01-13T14:32:00Z"
}
```

### Notes Table (Updated)
```typescript
{
  id: "uuid",
  user_id: "auth-user-id",
  title: "Cours de Math",
  type: "pdf",
  folder_id: "folder-uuid" | null, // ← New column
  summary_markdown: "...",
  flashcards: [],
  created_at: "2026-01-13T14:32:00Z",
  updated_at: "2026-01-13T14:32:00Z"
}
```

---

## 🎨 UI Components

### FolderCard
- Purple/Pink gradient icon
- Folder name
- Note count
- Hover effects (scale, border glow)

### NoteCard
- Note icon (type-based)
- Title and relative date
- "Move to" dropdown menu
- Click to view note

### Create Folder Modal
- Input field for folder name
- Cancel/Create buttons
- Glassmorphism styling

---

## 🔐 Security

### RLS Policies
- ✅ Users can only view their own folders
- ✅ Users can only create folders for themselves
- ✅ Users can only update/delete their own folders
- ✅ Notes can reference folders (foreign key)
- ✅ Deleting a folder sets notes' folder_id to NULL (ON DELETE SET NULL)

---

## 🧪 Testing

### 1. Setup Database
```sql
-- Execute SQL scripts above
```

### 2. Test Create Folder
```bash
npm run dev
# Visit http://localhost:3000/dashboard/notes
# Click "Nouveau Dossier"
# Enter folder name
# Click "Créer"
```

### 3. Test Move Note
```bash
# Click on a note's "..." menu
# Select a folder from "Déplacer vers"
# Note should disappear from "Unfiled" and appear in folder
```

### 4. Test Folder View
```bash
# Click on a folder card
# Should show notes in that folder
# Click "Back" arrow to return to root
```

---

## ✅ Checklist

- [ ] `folders` table created
- [ ] RLS policies configured
- [ ] `notes.folder_id` column added
- [ ] Indexes created
- [ ] Triggers set up
- [ ] Test create folder
- [ ] Test move note
- [ ] Test folder view
- [ ] Test empty states

---

**✨ Your folder system is production-ready!**

