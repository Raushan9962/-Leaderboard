# Leaderboard Application

A full-stack leaderboard app built with React (frontend) and Node.js/Express/MongoDB (backend). Users can join, claim points, and view rankings in real time.

## Features

- User registration and ranking
- Claim random points for users
- View top 3 and full leaderboard
- Point history with pagination
- Modern mobile leaderboard view
- RESTful API backend

## Project Structure

```
leaderboard/
  backend/
    .env
    package.json
    src/
      seedData.js
      server.js
      config/
        database.js
      controllers/
        pointsController.js
        userController.js
      models/
        PointHistory.js
        User.js
      routes/
        pointsRoutes.js
        userRoutes.js
  frontend/
    .env
    .gitignore
    eslint.config.js
    index.html
    package.json
    postcss.config.js
    README.md
    tailwind.config.js
    vite.config.js
    public/
      vite.svg
    src/
      App.css
      App.jsx
      index.css
      main.jsx
      componets/
      hooks/
      services/
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB running locally (`mongodb://localhost:27017/leaderboard`)

### Backend Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Configure environment variables in `.env` (already provided).
3. Seed the database (optional):
   ```sh
   npm run seed
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
   The API runs at `http://localhost:5000`.

### Frontend Setup

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Configure API base URL in `frontend/.env` (already provided).
3. Start the frontend:
   ```sh
   npm run dev
   ```
   The app runs at `http://localhost:5173`.

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Add users, claim points, and view rankings.
- Explore the modern leaderboard and point history sections.

## API Endpoints

- `GET /api/users` — List all users
- `POST /api/users` — Create a user
- `POST /api/users/:id/claim` — Claim points for a user
- `GET /api/points/history` — Get point history (paginated)
- `GET /api/points/history/:userId` — Get history for a user

## Technologies

- **Frontend:** React, Vite, Tailwind CSS, Axios, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose

## License

MIT

---

For questions or issues, open an
