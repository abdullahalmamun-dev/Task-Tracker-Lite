import { useState } from 'react';
import toast from 'react-hot-toast';
import { createTask } from '../api';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const newTask = await createTask({ title, description });
            onTaskCreated(newTask);
            setTitle('');
            setDescription('');
            toast.success('Task created successfully!');
        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Failed to create task');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="card p-6 mb-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 font-medium"
                        placeholder="Task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <button 
                        type="submit" 
                        className="btn bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none whitespace-nowrap px-8 py-3.5 text-base font-semibold"
                        disabled={isSubmitting || !title.trim()}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Task'}
                    </button>
                </div>
                <textarea
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 text-sm resize-none"
                    placeholder="Task description (optional)..."
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-3 pl-2 font-medium">{error}</p>}
        </form>
    );
};

export default TaskForm;
