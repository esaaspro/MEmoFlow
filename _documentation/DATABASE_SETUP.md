# 🗄️ Database Setup Guide

## Supabase Tables Configuration

### Table: `notes`

Stocke les notes/fiches de révision générées par l'IA.

```sql
-- Create notes table
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pdf', 'youtube', 'audio', 'text', 'link')),
  summary_markdown TEXT,
  flashcards JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own notes"
  ON public.notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes"
  ON public.notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
  ON public.notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
  ON public.notes FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_notes_user_id ON public.notes(user_id);
CREATE INDEX idx_notes_created_at ON public.notes(created_at DESC);
CREATE INDEX idx_notes_type ON public.notes(type);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### Table: `profiles` (Already Created)

Référence pour complétion :

```sql
-- Verify profiles table exists
SELECT * FROM public.profiles LIMIT 1;

-- If needed, ensure the structure matches:
-- id UUID (primary key, references auth.users)
-- first_name TEXT
-- created_at TIMESTAMP WITH TIME ZONE
-- updated_at TIMESTAMP WITH TIME ZONE
```

---

## 🧪 Test Data (Optional)

Pour tester le Dashboard avec des données mockées :

```sql
-- Insert test notes (replace 'YOUR_USER_ID' with your actual user ID)
INSERT INTO public.notes (user_id, title, type, summary_markdown, flashcards)
VALUES
  (
    'YOUR_USER_ID',
    'Introduction à la Comptabilité',
    'pdf',
    '# 📊 Comptabilité Générale\n\n## Le Bilan\n\nLe **bilan** représente la situation patrimoniale...',
    '[{"question": "Qu''est-ce que l''actif ?", "answer": "Ce que l''entreprise possède"}]'::jsonb
  ),
  (
    'YOUR_USER_ID',
    'Cours de Mathématiques - Chapitre 5',
    'audio',
    '# 🧮 Mathématiques\n\n## Les Dérivées\n\nLa **dérivée** d''une fonction...',
    '[]'::jsonb
  ),
  (
    'YOUR_USER_ID',
    'Histoire : La Révolution Française',
    'youtube',
    '# 🏛️ Histoire de France\n\n## La Révolution de 1789\n\nLes causes de la révolution...',
    '[{"question": "Quand a eu lieu la prise de la Bastille ?", "answer": "Le 14 juillet 1789"}]'::jsonb
  );
```

---

## 🔍 Verification Queries

```sql
-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('notes', 'profiles');

-- Check RLS policies
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename IN ('notes', 'profiles');

-- Count notes per user
SELECT user_id, COUNT(*) as note_count
FROM public.notes
GROUP BY user_id;
```

---

## 🔐 Security Checklist

- [x] RLS (Row Level Security) enabled on all tables
- [x] Policies restrict users to their own data only
- [x] Foreign keys ensure data integrity
- [x] Indexes created for query performance
- [x] Timestamps auto-update on changes

---

## 📝 Notes Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `user_id` | UUID | Foreign key to `auth.users` |
| `title` | TEXT | Note title |
| `type` | TEXT | Type: 'pdf', 'youtube', 'audio', 'text', 'link' |
| `summary_markdown` | TEXT | AI-generated summary (Markdown) |
| `flashcards` | JSONB | Array of flashcard objects |
| `created_at` | TIMESTAMP | Creation timestamp (UTC) |
| `updated_at` | TIMESTAMP | Last update timestamp (UTC) |

---

## 🚀 Next Steps

1. **Create the tables** using the SQL above in Supabase SQL Editor
2. **Verify RLS policies** are active
3. **Test with sample data** (optional)
4. **Start using the Dashboard** to see your notes!

---

**✨ Your database is now ready for MemoFlow!**

