# 🌐 Website Processing - Setup Guide

## 📦 Dependencies

### Installed Packages
```json
{
  "jsdom": "^24.0.0",
  "@mozilla/readability": "^0.4.4",
  "@types/jsdom": "^21.1.6"
}
```

**Usage:**
```typescript
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
```

---

## 🔄 Complete Flow

```
1. User clicks "Lien Site Web"
   ↓
2. Modal opens with URL input field
   ↓
3. User pastes website URL
   ↓
4. User clicks "Générer la fiche"
   ↓
5. API validates URL format
   ↓
6. Fetch HTML with User-Agent header
   ↓
7. Parse HTML with JSDOM
   ↓
8. Extract main content with Readability
   ↓
9. Validate content length (> 500 chars)
   ↓
10. Generate summary with Groq AI
   ↓
11. Save note to database:
    - title: Extracted article title
    - type: "website"
    - summary_markdown: AI-generated content
   ↓
12. Redirect to /dashboard/notes/[noteId]
```

---

## 🎯 Supported Websites

### Works Best With
- ✅ **Blog posts** (Medium, Dev.to, personal blogs)
- ✅ **News articles** (Le Monde, Le Figaro, etc.)
- ✅ **Wikipedia articles**
- ✅ **Documentation pages** (MDN, etc.)
- ✅ **Academic papers** (if HTML accessible)

### May Have Issues
- ⚠️ **Paywalled content** (requires subscription)
- ⚠️ **JavaScript-heavy sites** (SPA, React apps)
- ⚠️ **Protected/Private pages** (login required)
- ⚠️ **Very short pages** (< 500 characters)

---

## 🔧 Technical Details

### HTML Fetching
```typescript
const response = await fetch(url, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    Accept: "text/html,application/xhtml+xml...",
    "Accept-Language": "fr-FR,fr;q=0.9...",
  },
});
```

**Why User-Agent?**
- Some sites block requests without proper headers
- Mimics a real browser to avoid bot detection
- Improves compatibility with most websites

### Content Extraction
```typescript
const dom = new JSDOM(html, { url });
const reader = new Readability(dom.window.document);
const article = reader.parse();

// Returns:
{
  title: "Article Title",
  textContent: "Clean text without ads/navbars",
  excerpt: "Short summary",
  // ... other metadata
}
```

**What Readability Does:**
- ✅ Removes navigation bars
- ✅ Removes ads and sidebars
- ✅ Extracts main article content
- ✅ Preserves text structure
- ✅ Removes scripts and styles

---

## 📊 Content Validation

### Minimum Length
```typescript
if (textContent.length < 500) {
  throw new Error("Contenu insuffisant ou illisible");
}
```

**Why 500 characters?**
- Ensures meaningful content
- Filters out landing pages
- Better AI generation results

### Validation Checks
1. ✅ URL format valid (http/https)
2. ✅ HTML fetched successfully
3. ✅ Content extracted by Readability
4. ✅ Text content > 500 characters
5. ✅ Title extracted (or fallback)

---

## 🧠 AI Processing

### Input
- Clean text content (no HTML, no ads)
- Extracted by Readability

### Processing
- Uses existing `generateStudyContent()` function
- Groq AI with Llama 3.3 70B
- Generates structured Markdown summary

### Output Format
```markdown
# 📊 [Article Title]

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
  title: "Extracted Article Title",
  type: "website",
  summary_markdown: "# 📊 Article Title...",
  flashcards: [],
  created_at: "2026-01-13T14:32:00Z",
  updated_at: "2026-01-13T14:32:00Z"
}
```

**Note:** To store the original URL, you can:
1. Add a `metadata` JSONB column to `notes` table
2. Store URL in `metadata.original_url`
3. Or add a dedicated `original_url` column

---

## ⚠️ Common Issues

### Issue 1: "Site protégé ou inaccessible"
**Causes:**
- Site requires authentication
- Site blocks automated requests
- Site is down or unreachable
- CORS restrictions

**Solutions:**
- Try a different URL
- Check if site requires login
- Verify URL is correct
- Some sites may need different headers

### Issue 2: "Contenu insuffisant ou illisible"
**Causes:**
- Page is mostly JavaScript (SPA)
- Page is a landing page (not an article)
- Readability couldn't extract main content

**Solutions:**
- Use a page with clear article content
- Try a different article from the same site
- Some sites may not be compatible

### Issue 3: "Impossible d'extraire le contenu principal"
**Causes:**
- HTML structure is non-standard
- Page has no clear article content
- Readability parser failed

**Solutions:**
- Try a different article
- Some sites may need custom parsing

---

## 🧪 Testing

### 1. Test URL Validation
```typescript
// Valid URLs
"https://fr.wikipedia.org/wiki/..."
"https://medium.com/@user/article"
"https://example.com/blog/post"

// Invalid URLs
"not-a-url"
"ftp://example.com"
"javascript:void(0)"
```

### 2. Test Content Extraction
```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Click "Lien Site Web"
# Paste a blog/article URL
# Click "Générer la fiche"
```

### 3. Test Flow
1. Select a blog post or article
2. Copy the URL
3. Paste in modal
4. Click "Générer la fiche"
5. Wait for processing (~10-30 seconds)
6. Redirected to new note with AI-generated summary

### 4. Test Error Cases
- Invalid URL → Validation error
- Protected site → "Site protégé ou inaccessible"
- Short page → "Contenu insuffisant"
- JavaScript-heavy site → May fail extraction

---

## 🚀 Production Optimization

### Error Handling
- ✅ URL format validation
- ✅ Fetch error handling
- ✅ Readability extraction error handling
- ✅ Content length validation
- ✅ AI generation error handling
- ✅ Database save error handling

### Performance
- **HTML Fetch:** ~1-3 seconds
- **Content Extraction:** ~0.5-1 second
- **AI Generation:** ~5-15 seconds
- **Total:** ~10-30 seconds (depending on content length)

### Limitations
- **JavaScript Sites:** May not work (SPA, React apps)
- **Paywalled Content:** Cannot access without subscription
- **Dynamic Content:** May miss content loaded via JS
- **Rate Limiting:** Some sites may rate-limit requests

---

## 🎯 Future Enhancements

### 1. Store Original URL
```sql
-- Add metadata column
ALTER TABLE notes ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;

-- Store URL
{
  "original_url": "https://example.com/article",
  "extracted_title": "Article Title",
  "content_length": 5000
}
```

### 2. Custom Parsers
```typescript
// Site-specific parsers for better extraction
const parsers = {
  "wikipedia.org": parseWikipedia,
  "medium.com": parseMedium,
  // ...
};
```

### 3. Caching
```typescript
// Cache extracted content to avoid re-fetching
const cacheKey = `website:${url}`;
const cached = await redis.get(cacheKey);
```

### 4. Screenshot/Preview
```typescript
// Generate preview image of the page
const screenshot = await takeScreenshot(url);
```

### 5. Language Detection
```typescript
// Auto-detect language and adjust AI prompt
const language = detectLanguage(textContent);
```

---

## 🔐 Security Considerations

### User-Agent Spoofing
- ✅ Used to improve compatibility
- ⚠️ Some sites may detect and block
- ✅ Not malicious (just for content extraction)

### Rate Limiting
- ⚠️ Respect robots.txt (future enhancement)
- ⚠️ Implement rate limiting per user
- ⚠️ Cache results to reduce requests

### Content Validation
- ✅ Validate URL format
- ✅ Sanitize extracted content
- ✅ Check content length
- ✅ Validate before AI processing

---

## ✅ Checklist

- [x] `jsdom` and `@mozilla/readability` installed
- [x] `@types/jsdom` installed
- [x] API route `/api/process-website` created
- [x] URL validation implemented
- [x] HTML fetching with User-Agent
- [x] Content extraction with Readability
- [x] Content length validation
- [x] AI generation integration
- [x] Database save logic
- [x] UI modal updated for website URLs
- [x] Loading states implemented
- [x] Error messages displayed
- [x] Redirect to note page after success

---

## 📝 Example Usage

### Frontend (Modal)
```typescript
// User pastes URL
const url = "https://fr.wikipedia.org/wiki/Intelligence_artificielle";

// API call
const response = await fetch("/api/process-website", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url, userId }),
});

const { noteId } = await response.json();
router.push(`/dashboard/notes/${noteId}`);
```

### Backend (API)
```typescript
// Fetch HTML
const html = await fetchHtml(url);

// Extract content
const { title, textContent } = extractContent(html, url);

// Generate summary
const summary = await generateStudyContent(textContent);

// Save to DB
await supabase.from("notes").insert({
  title,
  type: "website",
  summary_markdown: summary,
});
```

---

## 🎓 Best Practices

### For Users
1. **Use article URLs** (not landing pages)
2. **Check content is accessible** (no login required)
3. **Prefer text-heavy articles** (not image galleries)
4. **Use standard formats** (blogs, news, Wikipedia)

### For Developers
1. **Handle errors gracefully** (show clear messages)
2. **Validate content length** (ensure quality)
3. **Cache results** (reduce API calls)
4. **Respect rate limits** (don't abuse sites)

---

**✨ Your website processing system is production-ready!**

