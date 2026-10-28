# LifeLessons – Digital Life Lessons

**Live site:** https://life-lessons-client.vercel.app

**Server repository:** https://github.com/safayetahmed82/life-lessons-server

## Purpose

People learn valuable lessons and then forget them. LifeLessons is a platform where users can write down, organize and share the life lessons they have gathered, save the ones that matter to them, and learn from what other people have lived through. Free members read public Free lessons, and Premium members, who pay once through Stripe, can read Premium lessons as well.

## Key Features

- **Authentication with Better Auth:** register and log in with email and password, or continue with Google. Passwords must have an uppercase letter, a lowercase letter and at least 6 characters. Logged-in users stay logged in when they reload any private page.
- **Free and Premium plans:** every user starts on the Free plan and can upgrade with a one-time ৳1500 Stripe payment in test mode. A Stripe webhook marks the user as Premium in MongoDB, and the server blocks Premium lessons for Free users, so they cannot be read by calling the API directly.
- **Lessons:** create, update and delete lessons with a title, story, category, emotional tone and an optional image. Choose Public or Private visibility, and Free or Premium access (Premium access can only be chosen by Premium users).
- **Public Lessons page:** search by title or keyword, filter by category and emotional tone, sort by newest or most saved, and browse with pagination. Premium lessons appear blurred with an upgrade prompt for Free users.
- **Lesson details:** full story, author card, likes, saves to a personal Favorites list, comments, and a report button with a reason dropdown. A reading time is calculated from the word count.
- **User dashboard:** an overview with totals and a weekly chart, My Lessons table with inline visibility and access changes, My Favorites with filters, and a profile page where users can change their name and photo.
- **Admin dashboard:** platform statistics with growth charts, manage users and roles, manage lessons (feature, mark as reviewed, delete), and review reported lessons.
- **Home page:** an animated hero slider, Featured lessons chosen by admins, Top Contributors of the Week, and Most Saved Lessons, with Framer Motion animations.
- **Responsive design:** works on mobile, tablet and desktop, with a hamburger menu, equal-size lesson cards, a loading spinner, a custom 404 page and a page title that changes on every route.

## npm Packages Used

**Client**

- `react`, `react-dom`
- `react-router-dom`
- `better-auth`
- `framer-motion`
- `react-hot-toast`
- `react-icons`
- `tailwindcss`, `@tailwindcss/vite`
- `vite`

**Server**

- `express`
- `mongodb`
- `better-auth`
- `stripe`
- `cors`
- `dotenv`
- `nodemon` (development)

## Run Locally

1. Clone the repository and install the packages:

```bash
git clone https://github.com/safayetahmed82/life-lessons-client.git
cd life-lessons-client
npm install
```

2. Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:5000
```

3. Start the app:

```bash
npm run dev
```

The app opens at `http://localhost:5173`. It needs the LifeLessons server running as well. The server needs its own `.env` file with `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CLIENT_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.

## Repositories

- **Client:** https://github.com/safayetahmed82/life-lessons-client
- **Server:** https://github.com/safayetahmed82/life-lessons-server