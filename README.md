# 🔖 Smart Bookmarks

A bookmark management web app that allows users to securely save and access their links in real time.

Built using Next.js App Router and Supabase for a lean, production-ready full-stack architecture.

---

## 🚀 Project Overview

Smart Bookmarks enables users to:

- Authenticate securely
- Add, view, and delete bookmarks
- Persist data in a cloud database
- Sync updates in real time across tabs
- Access protected routes

The focus of this project was to build a scalable, secure application while making strong architectural decisions under time constraints.

---

## 🛠 Tech Stack

- **Next.js (App Router)** – Routing, Server & Client Components, SSR
- **Supabase**
  - Authentication (OAuth)
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Realtime Subscriptions
- **Tailwind CSS** – UI styling

---

## 🧠 Key Challenges & Solutions

### 1️⃣ Rapid Tech Stack Adoption

**Challenge:** Limited familiarity with parts of the stack.

**Solution:**  
Focused on practical implementation:

- Understood Server vs Client Components
- Structured protected routes correctly
- Used Supabase client for both server and browser environments

---

### 2️⃣ Supabase Setup & Configuration

**Challenge:** No prior experience with Supabase authentication, policies, and Realtime.

**Solution:**

- Configured OAuth authentication
- Designed bookmark schema
- Implemented RLS for per-user data isolation
- Integrated Realtime subscriptions for live updates

---

### 3️⃣ Architecture Decision: RLS vs Custom Backend

**Challenge:** Choosing between:

- Building custom API routes
- Querying the database directly from the client

**Decision:** Used Supabase RLS.

**Benefits:**

- Reduced backend boilerplate
- Faster development
- Secure row-level isolation
- Simpler deployment architecture

---

### 4️⃣ Realtime Sync Across Tabs

**Challenge:** Ensuring updates reflect instantly across multiple open tabs.

**Solution:**

- Used Supabase Realtime channels
- Structured state management carefully
- Separated data logic into reusable hooks

---

### 5️⃣ Managing Server vs Client Boundaries

**Challenge:** Understanding when to use Server Components vs Client Components.

**Solution:**

- Server Components for protected data fetching
- Client Components for interactive UI
- Avoided unnecessary client-side fetching

---

### 6️⃣ Secure Data Access

**Challenge:** Preventing users from accessing other users’ bookmarks.

**Solution:** Implemented Row Level Security policies:

- Users can only read/write their own rows
- Security enforced at database level

---

## 🏗 Architecture Overview

- Authentication handled by Supabase
- Database queries secured via RLS
- Realtime subscriptions for live updates
- Next.js handles routing and rendering
- Minimal traditional custom backend required

---

## 📌 Future Improvements

- Bookmark folders / tagging
- Search and filtering
- Optimized pagination
- Bookmark metadata previews
- Drag-and-drop reordering
- Unit and integration testing

---

## 📷 Demo

View Deployed Project: https://smart-bookmark-k8w2jjb0h-aryan-mehers-projects.vercel.app
