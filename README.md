<h1>Musicality</h1>

**Spotify clone project**
Full stack web app to listen to music</br>

## Requirements

- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)

## Backend Setup :

### 1. Environment variables

Create .env file
```
PORT=...
MONGODB_URI=...
ADMIN_EMAIL=...
NODE_ENV=...

CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_CLOUD_NAME=...


CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### 2. Run :
```
cd backend
npm install
npm run dev
```

Backend run on http://localhost:5000

## Frontend Setup :

### 1. Environment variables

Create .env file
```
VITE_CLERK_PUBLISHABLE_KEY=...
```

### 2. Run
```
cd frontend
npm install
npm run dev
```

Frontend run on http://localhost:3000
