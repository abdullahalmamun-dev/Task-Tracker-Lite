import { useState, useEffect } from 'react';
import './App.css';
import { fetchTasks } from './api';
import TaskList from './components/TaskList';

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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p>Manage your daily tasks efficiently and elegantly.</p>
      </header>

      <main className="app-main">
        <TaskList tasks={tasks} loading={loading} />
      </main>

      <footer className="app-footer">
        <p>&bull; Task Tracker Lite</p>
      </footer>
    </div>
  );
}

export default App;
