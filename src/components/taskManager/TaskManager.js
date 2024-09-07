import React, { useState, useEffect } from 'react';
import TaskList from '../taskList/TaskList';
import TaskForm from '../taskForm/TaskForm';
import { fetchTasks } from '../../services/taskService';
import './TaskManager.css';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const tasks = await fetchTasks();
            setTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleFormClose = () => {
        setEditingTask(null);
        loadTasks();
    };

    const handleTaskUpdate = async () => {
        loadTasks();
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="task-manager-container">
            <input
                type="text"
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <TaskList tasks={filteredTasks} onEdit={handleEdit} onTaskUpdate={handleTaskUpdate} />
            <TaskForm existingTask={editingTask} onFormClose={handleFormClose} />
        </div>
    );
};

export default TaskManager;
