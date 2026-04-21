import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, loading, onTaskUpdated, onTaskDeleted }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading tasks...</p>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="card p-16 text-center border-dashed border-2 bg-slate-50/50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">No tasks yet</h3>
                <p className="text-slate-500">Get started by adding a new task above.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {tasks.map((task, index) => (
                <div key={task._id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <TaskCard 
                        task={task} 
                        onUpdate={onTaskUpdated}
                        onDelete={onTaskDeleted}
                    />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
