import React from 'react';
import { deleteTask, updateTask } from '../services/taskService'; // Asegúrate de importar updateTask

const TaskList = ({ tasks, onEdit, onTaskUpdate }) => {
    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            onTaskUpdate(); // Re-fetch tasks after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleCompletion = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);
            onTaskUpdate(); // Re-fetch tasks after update
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleCompletion(task)}
                        />
                        {task.completed ? 'Completada' : 'Incompleta'}
                    </label>
                    <button onClick={() => onEdit(task)}>Editar</button>
                    <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
