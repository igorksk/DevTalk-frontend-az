# DevTalk UA — Frontend

React 18 + TypeScript SPA built with Vite.

## Tech Stack

- **UI Library:** React 18
- **Language:** TypeScript 5
- **Build Tool:** Vite 5
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS Modules + global CSS variables

## Project Structure

```
src/
├── api/
│   ├── client.ts       # Axios instance (baseURL = /api)
│   ├── auth.ts         # login()
│   ├── topics.ts       # getTopics, getTopicById, createTopic, addComment
│   ├── news.ts         # getNews, getNewsById
│   └── users.ts        # getUserById
├── components/
│   ├── NavBar.tsx / .module.css
│   ├── TopicCard.tsx / .module.css
│   ├── NewsCard.tsx / .module.css
│   └── CommentItem.tsx / .module.css
├── context/
│   └── AuthContext.tsx  # Auth state via sessionStorage
├── pages/
│   ├── HomePage.tsx / .module.css
│   ├── ForumPage.tsx / .module.css
│   ├── TopicDetailPage.tsx / .module.css
│   ├── NewsPage.tsx / .module.css
│   ├── NewsArticlePage.tsx / .module.css
│   ├── LoginPage.tsx / .module.css
│   └── ProfilePage.tsx / .module.css
├── types/
│   └── index.ts        # Shared TypeScript interfaces
├── App.tsx             # Route definitions
├── main.tsx            # App entry point
└── index.css           # Global styles + CSS variables
```

## Getting Started

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`.

> API calls are proxied to `http://localhost:5000` via the Vite dev proxy.  
> Make sure the backend is running before starting the frontend.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (TypeScript check + Vite bundle) |
| `npm run preview` | Preview production build locally |

## Pages

| Route | Page | Auth required |
|-------|------|:---:|
| `/` | Home — latest topics + news | No |
| `/forum` | Forum list with category filter | No |
| `/forum/:id` | Topic detail + comments | No (post requires login) |
| `/news` | News list with category filter | No |
| `/news/:id` | News article detail | No |
| `/login` | Login form | No |
| `/profile` | User profile | Yes |

## Auth

Authentication state is stored in `sessionStorage` under the key `devtalk_user`.  
It survives page refreshes and is cleared when the browser tab is closed.
