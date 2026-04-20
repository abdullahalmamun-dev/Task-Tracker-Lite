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
