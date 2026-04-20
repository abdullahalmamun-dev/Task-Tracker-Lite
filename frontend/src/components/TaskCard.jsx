import React, { useState } from 'react';
import { updateTask, completeTask, deleteTask } from '../api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');
    const [isProcessing, setIsProcessing] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    const handleComplete = async () => {
        setIsProcessing(true);
        try {
            const updated = await completeTask(task._id);
            onUpdate(updated);
        } catch (err) {
            console.error(err);
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
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
        }
    };

    const handleSaveEdit = async () => {
        if (!editTitle.trim()) return;
        setIsProcessing(true);
        try {
            const updated = await updateTask(task._id, { title: editTitle, description: editDescription });
            onUpdate(updated);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isEditing) {
        return (
            <div className="card p-5 sm:px-6 transition-all duration-300">
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 font-semibold"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        disabled={isProcessing}
                        autoFocus
                    />
                    <textarea
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 text-sm resize-none"
                        rows="2"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        disabled={isProcessing}
                    />
                    <div className="flex justify-end gap-2 mt-1">
                        <button 
                            className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
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
                            className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            onClick={handleSaveEdit}
                            disabled={isProcessing || !editTitle.trim()}
                        >
                            {isProcessing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`card p-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-slideUp group ${task.status === 'completed' ? 'opacity-80 bg-slate-50 border-transparent hover:border-transparent hover:-translate-y-0' : 'hover:border-indigo-200/80'}`}>
            <div className="flex-1 min-w-0 w-full">
                <h3 className={`text-lg mb-1 font-semibold transition-colors truncate ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                    {task.title}
                </h3>
                
                {task.description && (
                    <p className={`text-sm mb-3 line-clamp-2 ${task.status === 'completed' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {task.description}
                    </p>
                )}
                
                <div className={`flex flex-wrap items-center gap-3 text-sm ${!task.description ? 'mt-1.5' : ''}`}>
                    <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] tracking-widest uppercase ${task.status === 'new' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                        {task.status}
                    </span>
                    <span className="text-slate-400 font-medium text-xs">
                        Created: {formatDate(task.createdAt)}
                    </span>
                    {task.completedAt && (
                        <span className="text-emerald-500 font-medium text-xs flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                            Done: {formatDate(task.completedAt)}
                        </span>
                    )}
                    {task.deletedAt && (
                        <span className="text-red-400 font-medium text-xs">
                            Deleted: {formatDate(task.deletedAt)}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {task.status === 'new' && (
                    <>
                        <button 
                            className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                            onClick={handleComplete}
                            title="Mark as completed"
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                        </button>
                        <button 
                            className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                            onClick={() => setIsEditing(true)}
                            title="Edit task"
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button 
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
