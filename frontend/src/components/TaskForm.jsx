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

        // Validation: Text only (letters and spaces)
        if (!/^[a-zA-Z\s]+$/.test(title)) {
            toast.error('Task title must only contain letters and spaces');
            return;
        }

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
        <div className="card p-6 sm:p-8 mb-10 overflow-hidden relative group">
            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all duration-700"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                                New Task
                            </label>
                            <span className="text-[10px] text-slate-300 font-medium italic">Alphabetic characters only</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                className="input-base text-lg font-bold"
                                placeholder="What needs to be done?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <button 
                                type="submit" 
                                className="btn bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:transform-none disabled:shadow-none whitespace-nowrap px-8"
                                disabled={isSubmitting || !title.trim()}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"></path></svg>
                                        <span>Add Task</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            Details (Optional)
                        </label>
                        <textarea
                            className="input-base text-sm resize-none"
                            placeholder="Add extra context or sub-tasks..."
                            rows="2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-4 px-1 font-medium animate-pulse">{error}</p>}
            </form>
        </div>
    );
};

export default TaskForm;
