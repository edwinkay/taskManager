import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../../services/taskService';
import '../taskManager/TaskManager.css';

const TaskForm = ({ existingTask, onFormClose }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (existingTask) {
            setTask(existingTask);
        } else {
            setTask({ title: '', description: '' });
        }
    }, [existingTask]);

    const handleInputChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task.id) {
                await updateTask(task.id, task);
            } else {
                await addTask(task);
                setTask({ title: '', description: '' });
            }
            onFormClose();
        } catch (error) {
            console.error('Error handling task submission:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                placeholder="Título"
                required
            />
            <input
                type="text"
                name="description"
                value={task.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                required
            />
            <button type="submit">{task.id ? 'Actualizar' : 'Agregar'} Tarea</button>
            {task.id && (
                <button type="button" onClick={onFormClose}>Cancelar</button>
            )}
        </form>
    );
};

export default TaskForm;
