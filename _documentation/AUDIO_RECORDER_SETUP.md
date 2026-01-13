# 🎤 Audio Recorder - Setup Guide

## 📦 Supabase Storage Configuration

### 1. Create Storage Bucket

Dans Supabase Dashboard → Storage, exécutez :

```sql
-- Create 'recordings' bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('recordings', 'recordings', true);
```

**OU** créez-le manuellement via l'interface :
1. Aller dans **Storage**
2. Cliquer sur **New Bucket**
3. Name: `recordings`
4. Public: **✓ Enabled** (pour les URLs publiques)

---

### 2. Configure Storage Policies

```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload their own recordings"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'recordings'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to read their own recordings
CREATE POLICY "Users can read their own recordings"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'recordings'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to delete their own recordings
CREATE POLICY "Users can delete their own recordings"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'recordings'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
```

---

## 🔐 Browser Permissions

### Microphone Access

L'utilisateur doit **autoriser l'accès au microphone** dans son navigateur.

**Chrome/Edge :**
1. Clic sur l'icône 🔒 dans la barre d'adresse
2. Permissions → Microphone → Autoriser

**Firefox :**
1. Clic sur l'icône 🔒
2. Permissions → Utiliser le microphone → Autoriser

---

## 🎙️ Recording Features

### MediaRecorder API

**Supported MIME Types :**
- `audio/webm;codecs=opus` (Chrome, Edge, Firefox)
- `audio/mp4` (Safari, iOS)
- `audio/ogg` (Firefox)

**Background Safety :**
- ✅ Recording continues when tab is inactive
- ✅ Timer uses `Date.now()` delta (not `setInterval` increments)
- ✅ No drift even after hours of recording

---

## 🧠 Groq Whisper Integration

### Model Used
```typescript
model: "whisper-large-v3"
language: "fr" // French
temperature: 0.0 // Most accurate
response_format: "text"
```

### Supported Languages
Change `language` parameter :
- `"fr"` : French
- `"en"` : English
- `"es"` : Spanish
- `"de"` : German
- `"it"` : Italian
- `null` : Auto-detect

---

## 🔄 Complete Flow

```
1. User clicks "Commencer l'enregistrement"
   ↓
2. Browser requests microphone permission
   ↓
3. MediaRecorder starts recording
   ↓
4. Timer updates every second (background-safe)
   ↓
5. User can Pause/Resume/Stop
   ↓
6. User clicks "Terminer"
   ↓
7. Audio blob created from chunks
   ↓
8. Upload to Supabase Storage (/recordings/[userId]/[timestamp].webm)
   ↓
9. Send to Groq API for transcription
   ↓
10. Create note in database with:
    - title: "Enregistrement du [Date]"
    - type: "audio"
    - summary_markdown: Transcription
   ↓
11. Redirect to /dashboard/notes/[noteId]
```

---

## 🎨 UI States

### Idle
```
○ Grey Microphone
⏱️ 00:00
[Commencer l'enregistrement]
```

### Recording
```
● Red Pulsing Microphone (with glow)
⏱️ 02:34 (red pulsing)
[Pause] [Terminer]
"Enregistrement en cours..."
```

### Paused
```
◐ Yellow Microphone
⏱️ 02:34 (stopped)
[Reprendre] [Terminer]
"Enregistrement en pause"
```

### Processing
```
⟳ Purple Spinning Loader
⏱️ 02:34
"Transcription en cours..."
```

---

## 🧪 Testing

### 1. Setup Storage
```bash
# Execute SQL in Supabase SQL Editor
# (Bucket creation + Policies)
```

### 2. Test Recording
```bash
npm run dev
# Visit http://localhost:3000/test-recorder
```

### 3. Test Flow
1. Click "Commencer l'enregistrement"
2. **Allow microphone** in browser popup
3. Speak for 10-15 seconds
4. Click "Terminer"
5. Wait for transcription (~5-10 seconds)
6. Redirected to new note with transcript

---

## 📊 Data Structure

### Supabase Storage
```
recordings/
├── [user-id-1]/
│   ├── 1704732000000.webm
│   ├── 1704818400000.webm
│   └── ...
├── [user-id-2]/
│   └── ...
```

### Notes Table
```typescript
{
  id: "uuid",
  user_id: "user-uuid",
  title: "Enregistrement du 8 janvier 2026 à 14:32",
  type: "audio",
  summary_markdown: "# 🎤 Transcript\n\nTranscribed text here...",
  flashcards: [],
  created_at: "2026-01-08T14:32:00Z",
  updated_at: "2026-01-08T14:32:00Z"
}
```

---

## ⚠️ Common Issues

### Issue 1: "Impossible d'accéder au microphone"
**Solution :**
- Check browser permissions
- HTTPS required (or localhost)
- Microphone not in use by another app

### Issue 2: "Failed to upload audio"
**Solution :**
- Check Supabase Storage bucket exists
- Check RLS policies are active
- Check CORS settings in Supabase

### Issue 3: "Transcription failed"
**Solution :**
- Check `GROQ_API_KEY` in `.env.local`
- Check audio file size (< 25MB)
- Check audio format is supported

---

## 🚀 Production Optimization

### File Size Limits
- **Browser:** Max ~500MB (Chrome), ~300MB (Firefox)
- **Groq API:** Max 25MB per file
- **Recommendation:** Implement chunking for long recordings (>1 hour)

### Compression
```typescript
const options = {
  mimeType: "audio/webm;codecs=opus",
  audioBitsPerSecond: 128000, // 128 kbps (good quality, small size)
};
```

### Progress Tracking
```typescript
// TODO: Implement progress bar
// Track upload progress with XMLHttpRequest
// Track transcription with Server-Sent Events (SSE)
```

---

## ✅ Checklist

- [ ] Supabase Storage bucket `recordings` created
- [ ] RLS policies configured for `storage.objects`
- [ ] `GROQ_API_KEY` in `.env.local`
- [ ] `notes` table exists in database
- [ ] Browser microphone permission granted
- [ ] Test recording successful
- [ ] Test transcription successful
- [ ] Test note creation successful

---

**✨ Your audio recording system is production-ready!**

