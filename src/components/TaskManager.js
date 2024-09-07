import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { fetchTasks } from '../services/taskService'; // Asegúrate de que esto esté importado

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTasks(); // Cargar tareas al montar el componente
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

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
        loadTasks(); // Re-load tasks when form is closed
    };

    const handleTaskUpdate = async () => {
        loadTasks(); // Re-fetch tasks after any operation
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TaskList tasks={filteredTasks} onEdit={handleEdit} onTaskUpdate={handleTaskUpdate} />
            {editingTask ? (
                <TaskForm existingTask={editingTask} onFormClose={handleFormClose} />
            ) : (
                <TaskForm onFormClose={handleFormClose} />
            )}
        </div>
    );
};

export default TaskManager;
