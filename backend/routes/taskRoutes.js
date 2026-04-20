const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = { status: { $ne: 'deleted' } };

        if (status && status !== 'All') {
            if (status.toLowerCase() === 'new' || status.toLowerCase() === 'completed') {
                query.status = status.toLowerCase();
            }
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        if (task.status !== 'new') {
            return res.status(400).json({ message: 'Only new tasks can be edited' });
        }

        if (req.body.title) {
            task.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            task.description = req.body.description;
        }

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        if (task.status === 'completed') {
            return res.status(400).json({ message: 'Task is already completed' });
        }
        
        if (task.status === 'deleted') {
            return res.status(400).json({ message: 'Cannot complete a deleted task' });
        }

        task.status = 'completed';
        task.completedAt = Date.now();

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.status !== 'new') {
            return res.status(400).json({ message: 'Only new tasks can be deleted' });
        }

        task.status = 'deleted';
        task.deletedAt = Date.now();

        await task.save();
        res.json({ message: 'Task deleted successfully', task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
