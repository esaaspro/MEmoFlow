# 🎬 Onboarding Page - Setup Guide

## 📊 Supabase Database Setup

Pour que la page d'onboarding fonctionne, vous devez créer la table `profiles` dans Supabase.

### 1. Créer la Table `profiles`

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 2. Vérifier la Configuration

```sql
-- Test query
SELECT * FROM public.profiles;
```

---

## 🔄 User Flow

1. **Sign Up** → User crée un compte sur `/auth?mode=signup`
2. **Auto Profile Creation** → Trigger crée automatiquement une entrée dans `profiles` avec `id`
3. **Redirect to Onboarding** → User est redirigé vers `/onboarding`
4. **Enter First Name** → User tape son prénom
5. **Save & Transition** → Prénom sauvegardé dans `profiles.first_name`
6. **Dashboard** → User arrive sur `/dashboard` avec son nom

---

## 🎨 Page Features

### Visual Design
- ✅ **Pure Black Background** (#000000)
- ✅ **Cinematic Typography** (Space Grotesk, 5xl-7xl)
- ✅ **Borderless Input** (Transparent, centered)
- ✅ **Neon Purple Underline** (Glows when typing)
- ✅ **Minimalist Arrow Button** (Appears on input)

### Animations
- ✅ **Fade In** (Container, 1s)
- ✅ **Slide Up** (Question, 1.2s with delay)
- ✅ **Slide Up** (Input, 1s with delay)
- ✅ **Scale In** (Button, 0.5s)
- ✅ **Fade Out** (Screen, 0.8s on submit)

### Interactions
- ✅ **Auto Focus** on input
- ✅ **Real-time Underline** (Scales with input)
- ✅ **Button Appears** when typing
- ✅ **Hover Effects** on button
- ✅ **Loading State** (Pulse animation)

---

## 🔐 Security

- ✅ **Protected Route** (Checks `user` from `AuthProvider`)
- ✅ **RLS Policies** (Users can only update their own profile)
- ✅ **Input Validation** (Trim whitespace)

---

## 📱 Responsive

- ✅ **Mobile**: `text-5xl`
- ✅ **Tablet**: `text-6xl`
- ✅ **Desktop**: `text-7xl`

---

## 🚀 Testing

1. **Create a new account** at `/auth?mode=signup`
2. **You should land on** `/onboarding`
3. **Type your first name** (e.g., "Jean")
4. **Watch the underline glow** (Purple gradient)
5. **Click the arrow button** (or press Enter)
6. **Smooth fade out** to black
7. **Redirect to** `/dashboard`

---

## 🎯 Next Steps

To fully integrate the onboarding flow:

1. **Update Auth Page** (`app/auth/page.tsx`):
   ```typescript
   // After successful signup
   if (data.user) {
     router.push("/onboarding"); // Instead of "/dashboard"
   }
   ```

2. **Check if User has First Name** (in Dashboard):
   ```typescript
   useEffect(() => {
     if (!user?.user_metadata?.first_name) {
       router.push("/onboarding");
     }
   }, [user]);
   ```

3. **Display First Name** in Sidebar or Dashboard.

---

**✨ The onboarding experience is now cinematic and immersive!**

