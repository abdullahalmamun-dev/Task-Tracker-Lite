# 📝 Task Tracker Lite (MERN Stack)

A highly polished, single-page Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). Engineered with clean architecture and a premium, modern UI, this application allows users to seamlessly create, update, complete, search, filter, and soft-delete tasks. 

**Built for the Instacall Technical Assessment.**

---

## 🚀 Key Features

* **Task Management**: Create tasks with titles and optional descriptions (default status: **new**).
* **Smart Editing**: Edit tasks inline with optimistic UI updates (**only if status is new**).
* **Task Lifecycle**: Mark tasks as completed (**one-way: new → completed**) with accurate timestamp tracking.
* **Soft Deletion**: Safely delete tasks (**only if status is new**) while preserving database records via a `deletedAt` flag.
* **Real-time Filtering & Search**: 
  * Filter tasks by status (**All / New / Completed**).
  * Fast, **debounced** search functionality to efficiently filter tasks by title.
* **Optimistic UI**: Instant visual feedback without requiring page reloads for interactions.
* **Timestamp Tracking**: Precise tracking of `createdAt`, `completedAt`, and `deletedAt` datetimes, rendered intelligently on the UI.

---

## 🏗️ Tech Stack & Architecture

### Frontend
* **React (Vite)**: Fast, modern tooling for the UI.
* **Tailwind CSS**: Utility-first CSS framework for a responsive, premium, minimalist light-theme.
* **Native Fetch API**: Clean, dependency-free asynchronous data fetching with structured error handling.
* **Optimistic State Management**: Ensures instantaneous UI feedback for all CRUD operations.

### Backend
* **Node.js & Express.js**: Robust and clean RESTful API design.
* **MongoDB & Mongoose**: Flexible document-based storage with robust schema validation.
* **CORS Configured**: Securely configured for cross-origin requests.

---

## ⚙️ Local Setup & Installation

### Prerequisites
* Node.js (v18+)
* MongoDB (Local instance or MongoDB Atlas URI)

### 1. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure your environment variables (.env)
# Create a .env file and add your MongoDB connection string and PORT
# Example:
# MONGODB_URI=mongodb://localhost:27017/task-tracker
# PORT=5000

# Start the server (runs on port 5000 by default)
npm start
```

### 2. Frontend Setup
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## 🔌 API Reference (RESTful)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Fetch all active tasks (supports `?status=` and `?search=` query params) |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Edit an existing task (only if status is 'new') |
| `PATCH`| `/api/tasks/:id/complete` | Mark a task as complete |
| `DELETE`|`/api/tasks/:id` | Soft delete a task |

---

## 👨‍💻 Author

**Abdullah Al Mamun**  
MERN Stack Developer  
[GitHub Profile](https://github.com/abdullahalmamun-dev)

---

## 📜 License

This project is open-source and free to use.
