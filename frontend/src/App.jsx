import { useState, useEffect } from 'react';
import { fetchTasks } from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-10 flex flex-col flex-1 min-h-screen">
      <header className="text-center mb-10 animate-fadeInDown">
        <div className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase">
          Workspace
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight mb-3">
          Task Tracker Lite
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          Manage your daily priorities efficiently with a beautiful, modern workflow.
        </p>
      </header>

      <main className="flex-1 flex flex-col animate-fadeIn relative z-10">
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList 
          tasks={tasks} 
          loading={loading} 
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </main>

      <footer className="text-center py-10 mt-auto text-slate-400 text-sm font-medium relative z-10">
        <p>&copy; {new Date().getFullYear()} &bull; Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;
