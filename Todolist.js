import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/tasks');
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add a new task
    const addTask = async () => {
        if (!task.trim()) return;
        try {
            await axios.post('http://localhost:5000/api/tasks', { task });
            setTask("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete an existing task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map((item) => (
                    <li key={item._id}>
                        {item.task}
                        <button onClick={() => deleteTask(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
