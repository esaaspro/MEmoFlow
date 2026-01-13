# 📄 Document Upload - Setup Guide

## 📦 Supabase Storage Configuration

### 1. Create Storage Bucket

Dans Supabase Dashboard → Storage, exécutez :

```sql
-- Create 'documents' bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);
```

**OU** créez-le manuellement via l'interface :
1. Aller dans **Storage**
2. Cliquer sur **New Bucket**
3. Name: `documents`
4. Public: **✓ Enabled** (pour les URLs publiques)

---

### 2. Configure Storage Policies

```sql
-- Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to read their own documents
CREATE POLICY "Users can read their own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to delete their own documents
CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
```

---

## 📚 Supported File Types

### PDF Files
- **MIME Type:** `application/pdf`
- **Extension:** `.pdf`
- **Library:** `pdf-parse`
- **Max Size:** 50 MB (recommended)

### DOCX Files
- **MIME Type:** `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- **Extension:** `.docx`
- **Library:** `mammoth`
- **Max Size:** 50 MB (recommended)

---

## 🔄 Complete Flow

```
1. User clicks "Importer un Document"
   ↓
2. Modal opens with drag & drop zone
   ↓
3. User selects/ drags PDF or DOCX file
   ↓
4. User clicks "Générer les Notes"
   ↓
5. File uploaded to Supabase Storage
   ↓
6. Text extracted from document:
   - PDF → pdf-parse
   - DOCX → mammoth.extractRawText
   ↓
7. Extracted text sent to Groq AI
   ↓
8. AI generates structured Markdown summary
   ↓
9. Note created in database:
   - title: filename (without extension)
   - type: "pdf" or "docx"
   - summary_markdown: AI-generated content
   ↓
10. Redirect to /dashboard/notes/[noteId]
```

---

## 🧠 AI Processing

### Text Extraction
```typescript
// PDF
const text = await pdfParse(buffer);

// DOCX
const result = await mammoth.extractRawText({ buffer });
const text = result.value;
```

### AI Generation
```typescript
// Uses existing generateStudyContent() function
const summaryMarkdown = await generateStudyContent(extractedText);
```

**Output Format:**
- Markdown with headers (H1, H2, H3)
- Bold text for key concepts
- Tables for comparisons
- Lists with bullet points
- Section "💡 Astuce" at the end

---

## 📊 Database Structure

### Note Created
```typescript
{
  id: "uuid-generated",
  user_id: "auth-user-id",
  title: "Cours de Mathématiques", // filename without extension
  type: "pdf" | "docx",
  summary_markdown: "# 📊 Cours de Mathématiques\n\n...",
  flashcards: [],
  created_at: "2026-01-13T14:32:00Z",
  updated_at: "2026-01-13T14:32:00Z"
}
```

### Storage Structure
```
documents/
├── user-abc123/
│   ├── 1704732000000.pdf (2MB)
│   ├── 1704818400000.docx (1.5MB)
│   └── ...
└── user-def456/
    └── ...
```

---

## ⚠️ Common Issues

### Issue 1: "Failed to upload document"
**Solution :**
- Check Supabase Storage bucket exists
- Check RLS policies are active
- Check file size (< 50MB)
- Check user is authenticated

### Issue 2: "No text could be extracted"
**Solution :**
- PDF might be scanned (image-based) → Use OCR
- DOCX might be corrupted → Try re-saving
- File might be password-protected → Remove password

### Issue 3: "Failed to generate summary"
**Solution :**
- Check `GROQ_API_KEY` in `.env.local`
- Check extracted text length (> 50 characters)
- Check Groq API quota/limits

---

## 🧪 Testing

### 1. Setup Storage
```bash
# Execute SQL in Supabase SQL Editor
# (Bucket creation + Policies)
```

### 2. Test Upload
```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Click "Importer un Document"
# Upload a PDF or DOCX file
```

### 3. Test Flow
1. Select a PDF file (e.g., course notes)
2. Click "Générer les Notes"
3. Wait for processing (~10-30 seconds)
4. Redirected to new note with AI-generated summary

---

## 📦 Dependencies

### Installed Packages
```json
{
  "pdf-parse": "^1.1.1",
  "mammoth": "^1.6.0"
}
```

### Usage
```typescript
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
```

---

## 🚀 Production Optimization

### File Size Limits
- **Browser:** Max ~50MB (recommended)
- **Server:** Check Vercel/Next.js limits
- **Groq API:** No explicit limit, but large files = slower processing

### Performance Tips
1. **Compress PDFs** before upload (if possible)
2. **Split large documents** into smaller chunks
3. **Cache extracted text** (optional, for re-processing)

### Error Handling
- ✅ File type validation
- ✅ File size validation
- ✅ Text extraction error handling
- ✅ AI generation error handling
- ✅ Database save error handling

---

## ✅ Checklist

- [ ] Supabase Storage bucket `documents` created
- [ ] RLS policies configured for `storage.objects`
- [ ] `pdf-parse` and `mammoth` installed
- [ ] `GROQ_API_KEY` in `.env.local`
- [ ] `notes` table exists in database
- [ ] Test PDF upload successful
- [ ] Test DOCX upload successful
- [ ] Test AI generation successful
- [ ] Test note creation successful
- [ ] Test redirect to note page successful

---

## 🎯 Next Steps

### 1. Add OCR Support (for scanned PDFs)
```typescript
// Use Tesseract.js or cloud OCR service
import Tesseract from "tesseract.js";
```

### 2. Add Progress Bar
```typescript
// Track upload and processing progress
<ProgressBar value={progress} />
```

### 3. Add Batch Processing
```typescript
// Process multiple files at once
const results = await Promise.all(files.map(processDocument));
```

---

**✨ Your document upload system is production-ready!**

