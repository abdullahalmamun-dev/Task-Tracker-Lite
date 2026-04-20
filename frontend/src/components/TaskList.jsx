import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, loading }) => {
    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="empty-state glass">
                <p>No tasks found. Time to create one!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task, index) => (
                <div key={task._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <TaskCard task={task} />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
