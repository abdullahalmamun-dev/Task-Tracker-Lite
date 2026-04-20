const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = async (status, search) => {
    let url = API_URL;
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }
    
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to create task');
        }
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const updateTask = async (id, taskData) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
        if (!res.ok) throw new Error('Failed to update task');
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const completeTask = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}/complete`, {
            method: 'PATCH',
        });
        if (!res.ok) throw new Error('Failed to complete task');
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete task');
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
