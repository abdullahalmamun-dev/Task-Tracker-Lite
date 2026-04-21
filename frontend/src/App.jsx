import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchTasks } from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and Search states
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debounce search query
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    loadTasks();
  }, [statusFilter, debouncedSearch]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks(statusFilter, debouncedSearch);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    if (statusFilter === 'All' || statusFilter === 'New') {
        if (!debouncedSearch) {
            setTasks([newTask, ...tasks]);
        } else {
            loadTasks();
        }
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    if (statusFilter !== 'All' && updatedTask.status !== statusFilter.toLowerCase()) {
        setTasks(tasks.filter(t => t._id !== updatedTask._id));
    } else {
        setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    }
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
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              borderRadius: '12px',
              background: '#fff',
              color: '#334155',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              border: '1px solid #e2e8f0',
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
          }} 
        />
        <TaskForm onTaskCreated={handleTaskCreated} />
        
        <FilterBar 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
        />

        <TaskList 
          tasks={tasks} 
          loading={loading} 
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </main>

      <footer className="text-center py-10 mt-auto text-slate-400 text-sm font-medium relative z-10">
        <p>&copy; {new Date().getFullYear()} &bull; <a href="https://instacall.digital/" target="_blank" >Built for Instacall</a></p>
      </footer>
    </div>
  );
}

export default App;
