import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { updateTask, completeTask, deleteTask } from '../api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');
    const [isProcessing, setIsProcessing] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    const handleComplete = async () => {
        setIsProcessing(true);
        try {
            const updated = await completeTask(task._id);
            onUpdate(updated);
            toast.success('Task completed! Great job.');
        } catch (err) {
            console.error(err);
            toast.error('Failed to complete task');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        setIsProcessing(true);
        try {
            await deleteTask(task._id);
            onDelete(task._id);
            toast.success('Task deleted.');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete task');
            setIsProcessing(false);
        }
    };

    const handleSaveEdit = async () => {
        if (!editTitle.trim()) return;

        if (!/^[a-zA-Z\s]+$/.test(editTitle)) {
            toast.error('Task title must only contain letters and spaces');
            return;
        }

        setIsProcessing(true);
        try {
            const updated = await updateTask(task._id, { title: editTitle, description: editDescription });
            onUpdate(updated);
            setIsEditing(false);
            toast.success('Task updated successfully.');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update task');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isEditing) {
        return (
            <div className="card p-6 sm:px-8 mb-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Task Title</label>
                        <input
                            type="text"
                            className="input-base"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            disabled={isProcessing}
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                        <textarea
                            className="input-base text-sm resize-none"
                            rows="2"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            disabled={isProcessing}
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                        <button 
                            className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all"
                            onClick={() => {
                                setIsEditing(false);
                                setEditTitle(task.title);
                                setEditDescription(task.description || '');
                            }}
                            disabled={isProcessing}
                        >
                            Cancel
                        </button>
                        <button 
                            className="px-6 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
                            onClick={handleSaveEdit}
                            disabled={isProcessing || !editTitle.trim()}
                        >
                            {isProcessing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`card p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-slideUp group ${task.status === 'completed' ? 'opacity-70 grayscale-[0.3]' : ''}`}>
            <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`flex-shrink-0 w-2 h-2 rounded-xl ${task.status === 'completed' ? 'bg-emerald-400' : 'bg-indigo-500'}`}></span>
                    <h3 className={`text-xl font-semibold transition-all truncate ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                        {task.title}
                    </h3>
                </div>
                
                {task.description && (
                    <p className={`text-base mb-4 leading-relaxed ${task.status === 'completed' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {task.description}
                    </p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm mt-auto">
                    <div className={`px-3 py-1 rounded-xl font-semibold text-[10px] tracking-widest uppercase flex items-center gap-1.5 ${task.status === 'new' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        <div className={`w-1 h-1 rounded-xl ${task.status === 'new' ? 'bg-indigo-400' : 'bg-emerald-400'}`}></div>
                        {task.status}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                        <span className="text-slate-400 font-medium text-xs flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Created {formatDate(task.createdAt)}
                        </span>
                        
                        {task.completedAt && (
                            <span className="text-emerald-500 font-semibold text-xs flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"></path></svg>
                                Completed {formatDate(task.completedAt)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-center opacity-100 md:opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 sm:translate-y-0 group-hover:translate-y-0">
                {task.status === 'new' && (
                    <>
                        <button 
                            className="w-10 h-10 flex items-center justify-center text-emerald-500 bg-emerald-50 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                            onClick={handleComplete}
                            title="Mark as completed"
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"></path></svg>
                        </button>
                        <button 
                            className="w-10 h-10 flex items-center justify-center text-indigo-500 bg-indigo-50 hover:bg-indigo-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                            onClick={() => setIsEditing(true)}
                            title="Edit task"
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button 
                            className="w-10 h-10 flex items-center justify-center text-red-400 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                            onClick={handleDelete}
                            title="Delete task"
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
