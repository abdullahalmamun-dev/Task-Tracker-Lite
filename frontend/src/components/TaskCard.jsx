import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <div className={`task-card glass ${task.status}`}>
            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-meta">
                    <span className={`status-badge ${task.status}`}>
                        {task.status.toUpperCase()}
                    </span>
                    <span className="task-date">
                        Created: {formatDate(task.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
