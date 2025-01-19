const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Add a task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task({ task: req.body.task });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
