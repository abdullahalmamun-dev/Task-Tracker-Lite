# 📝 Task Tracker Lite (MERN Stack)

A simple single-page Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to create, update, complete, search, filter, and soft-delete tasks.

---

# 🚀 Features

* Create tasks (default status: **new**)
* Edit tasks (**only if status is new**)
* View all tasks
* Filter tasks by:

  * All
  * New
  * Completed
* Search tasks by title
* Mark tasks as completed (**one-way: new → completed**)
* Soft delete tasks (**only if status is new**)
* Track timestamps:

  * Created time
  * Completed time
  * Deleted time

---

# 🏗️ Tech Stack

## Frontend

* React (Vite)
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/task-tracker-lite.git
cd task-tracker-lite
```

---

## 🔹 2. Backend Setup

```bash
cd backend
npm install
```

### ▶️ Run MongoDB

Make sure MongoDB is installed and running locally:

```bash
mongod
```

### ▶️ Start Backend Server

```bash
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

## 🔹 3. Frontend Setup

```bash
cd frontend
npm install
```

### ▶️ Install Required Packages

```bash
npm install axios
```

### ▶️ Start Frontend

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🔌 API Endpoints

## Base URL

```
http://localhost:5000/api/tasks
```

---

### 📌 Create Task

```
POST /api/tasks
```

**Body:**

```json
{
  "title": "Task title",
  "description": "Task description"
}
```

---

### 📌 Get Tasks (Filter + Search)

```
GET /api/tasks?status=all|new|completed&search=keyword
```

---

### 📌 Update Task (Only if New)

```
PUT /api/tasks/:id
```

---

### 📌 Mark Task as Completed

```
PATCH /api/tasks/:id/complete
```

---

### 📌 Delete Task (Soft Delete)

```
DELETE /api/tasks/:id
```

---

# 🔄 Business Rules

| Action                     | Condition    | Allowed     |
| -------------------------- | ------------ | ----------- |
| Edit                       | status = new | ✅ Yes       |
| Complete                   | status = new | ✅ Yes       |
| Delete                     | status = new | ✅ Yes       |
| Edit/Delete after complete | ❌            | Not allowed |

---

# ⚠️ Notes

* No authentication is implemented
* Deleted tasks are **soft deleted** (not removed from database)
* Completed tasks cannot be edited or deleted
* Search is case-insensitive

---

# 🧪 Testing Tips

* Create multiple tasks
* Try editing completed tasks (should fail)
* Try deleting completed tasks (should fail)
* Use search + filter together

---

# 🌟 Future Improvements

* Pagination
* User authentication (JWT)
* Drag & drop tasks
* Notifications (toast)
* Dark mode
* Deployment (Render / Vercel / MongoDB Atlas)

---

# 👨‍💻 Author

**Abdullah Al Mamun**
MERN Stack Developer

---

# 📜 License

This project is open-source and free to use.
