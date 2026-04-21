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
    <div className="max-w-4xl mx-auto w-full p-6 md:p-12 flex flex-col flex-1 min-h-screen">
      <header className="text-center mb-12 animate-fadeInDown">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-black tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Productivity Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight mb-4 drop-shadow-sm">
          Task Tracker Lite
        </h1>
        <p className="text-slate-500 text-xl max-w-xl mx-auto font-medium leading-relaxed">
          The minimalist way to manage your daily workflow with focus and clarity.
        </p>
      </header>

      <main className="flex-1 flex flex-col animate-fadeIn relative z-10">
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '20px',
              background: '#fff',
              color: '#334155',
              boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)',
              border: '1px solid #f1f5f9',
              padding: '16px 24px',
              fontSize: '15px',
              fontWeight: 600,
            },
            success: {
              iconTheme: {
                primary: '#6366f1',
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

      <footer className="text-center py-12 mt-auto text-slate-400 text-sm font-bold relative z-10 tracking-widest uppercase opacity-60">
        <p>&copy; {new Date().getFullYear()} &bull; <a href="https://instacall.digital/" target="_blank" className="hover:text-indigo-600 transition-colors">Built for Instacall</a></p>
      </footer>
    </div>
  );
}

export default App;
