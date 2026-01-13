# 🎥 YouTube Processing - Setup Guide

## 📦 Dependency

### Installed Package
```json
{
  "youtube-transcript": "^1.2.1"
}
```

**Usage:**
```typescript
import { YoutubeTranscript } from "youtube-transcript";
```

---

## 🔄 Complete Flow

```
1. User clicks "Lien YouTube"
   ↓
2. Modal opens with URL input field
   ↓
3. User pastes YouTube URL
   ↓
4. User clicks "Générer la fiche"
   ↓
5. API validates YouTube URL
   ↓
6. Extract video ID from URL
   ↓
7. Fetch transcript using youtube-transcript
   ↓
8. Combine transcript chunks into single text
   ↓
9. Generate summary with Groq AI
   ↓
10. Save note to database:
    - title: "Vidéo YouTube du [Date]"
    - type: "youtube"
    - summary_markdown: AI-generated content
   ↓
11. Redirect to /dashboard/notes/[noteId]
```

---

## 🎯 Supported URL Formats

### Valid YouTube URLs
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID&t=123s` (with timestamp)

### URL Validation
```typescript
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  // Returns video ID or null
}
```

---

## 📝 Transcript Fetching

### Language Priority
1. **French (fr)** - Tries French subtitles first
2. **Auto-detect** - Falls back to any available language

```typescript
// Try French first
transcriptChunks = await YoutubeTranscript.fetchTranscript(videoId, {
  lang: "fr",
});

// Fallback to auto-detect
transcriptChunks = await YoutubeTranscript.fetchTranscript(videoId);
```

### Transcript Format
```typescript
[
  { text: "Bonjour, aujourd'hui...", offset: 0, duration: 3.5 },
  { text: "nous allons parler de...", offset: 3500, duration: 4.2 },
  // ...
]
```

### Combined Text
```typescript
const transcriptText = transcriptChunks
  .map((chunk) => chunk.text)
  .join(" ")
  .trim();
```

---

## 🧠 AI Processing

### Input
- Combined transcript text (all chunks joined)

### Processing
- Uses existing `generateStudyContent()` function
- Groq AI with Llama 3.3 70B
- Generates structured Markdown summary

### Output Format
```markdown
# 📊 [Video Title]

## 🎯 Points Clés
- Point 1
- Point 2

## 💡 Astuce
[AI-generated tip]
```

---

## 📊 Database Structure

### Note Created
```typescript
{
  id: "uuid-generated",
  user_id: "auth-user-id",
  title: "Vidéo YouTube du 13 janvier 2026 à 14:32",
  type: "youtube",
  summary_markdown: "# 📊 Vidéo YouTube...",
  flashcards: [],
  created_at: "2026-01-13T14:32:00Z",
  updated_at: "2026-01-13T14:32:00Z"
}
```

**Note:** To store the original YouTube URL, you can:
1. Add a `metadata` JSONB column to `notes` table
2. Store URL in `metadata.youtube_url`
3. Or add a dedicated `original_url` column

---

## ⚠️ Common Issues

### Issue 1: "Impossible de récupérer les sous-titres"
**Causes:**
- Video has no captions/subtitles
- Captions are disabled
- Video is private/unlisted (may not work)

**Solutions:**
- Ensure video has captions enabled
- Try a different video
- Check video is public

### Issue 2: "URL YouTube invalide"
**Causes:**
- Malformed URL
- Not a YouTube URL

**Solutions:**
- Use standard YouTube URL format
- Copy URL directly from browser

### Issue 3: "Le transcript est trop court"
**Causes:**
- Video has very short captions
- Captions are incomplete

**Solutions:**
- Try a longer video
- Ensure captions are complete

---

## 🧪 Testing

### 1. Test URL Validation
```typescript
// Valid URLs
"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
"https://youtu.be/dQw4w9WgXcQ"

// Invalid URLs
"https://example.com/video"
"not-a-url"
```

### 2. Test Transcript Fetching
```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Click "Lien YouTube"
# Paste a YouTube URL with captions
# Click "Générer la fiche"
```

### 3. Test Flow
1. Select a YouTube video with captions
2. Copy the URL
3. Paste in modal
4. Click "Générer la fiche"
5. Wait for processing (~10-30 seconds)
6. Redirected to new note with AI-generated summary

---

## 🚀 Production Optimization

### Error Handling
- ✅ URL validation
- ✅ Video ID extraction
- ✅ Transcript fetch error handling
- ✅ Fallback to auto-detect language
- ✅ Empty transcript check
- ✅ AI generation error handling
- ✅ Database save error handling

### Performance
- **Transcript Fetch:** ~2-5 seconds
- **AI Generation:** ~5-15 seconds
- **Total:** ~10-30 seconds (depending on video length)

### Limitations
- **Video Length:** No explicit limit, but longer videos = longer processing
- **Captions Required:** Video must have captions/subtitles
- **Language:** Works best with French or English captions

---

## 🎯 Future Enhancements

### 1. Video Title Extraction
```typescript
// Use YouTube Data API or youtube-dl
import ytdl from "ytdl-core";

const info = await ytdl.getInfo(videoId);
const title = info.videoDetails.title;
```

### 2. Video Metadata Storage
```sql
-- Add metadata column to notes table
ALTER TABLE notes ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;

-- Store YouTube URL and video info
{
  "youtube_url": "https://...",
  "video_id": "dQw4w9WgXcQ",
  "channel": "Channel Name",
  "duration": 3600
}
```

### 3. Thumbnail Support
```typescript
// Store video thumbnail URL
const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
```

### 4. Timestamp Links
```markdown
## 📝 Transcript avec Timestamps

- [00:05] Introduction
- [02:30] Concept clé 1
- [05:15] Concept clé 2
```

---

## ✅ Checklist

- [x] `youtube-transcript` package installed
- [x] API route `/api/process-youtube` created
- [x] URL validation implemented
- [x] Transcript fetching with error handling
- [x] AI generation integration
- [x] Database save logic
- [x] UI modal updated for YouTube URLs
- [x] Loading states implemented
- [x] Error messages displayed
- [x] Redirect to note page after success

---

## 📝 Example Usage

### Frontend (Modal)
```typescript
// User pastes URL
const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// API call
const response = await fetch("/api/process-youtube", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url, userId }),
});

const { noteId } = await response.json();
router.push(`/dashboard/notes/${noteId}`);
```

### Backend (API)
```typescript
// Extract video ID
const videoId = extractVideoId(url); // "dQw4w9WgXcQ"

// Fetch transcript
const transcript = await YoutubeTranscript.fetchTranscript(videoId);

// Combine text
const text = transcript.map(chunk => chunk.text).join(" ");

// Generate summary
const summary = await generateStudyContent(text);

// Save to DB
await supabase.from("notes").insert({...});
```

---

**✨ Your YouTube processing system is production-ready!**

