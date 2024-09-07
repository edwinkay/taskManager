import React, { useState, useEffect } from 'react';
import TaskList from '../taskList/TaskList';
import TaskForm from '../taskForm/TaskForm';
import { fetchTasks } from '../../services/taskService';
import './TaskManager.css';  // Importa el archivo CSS

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
    };

    const handleFormClose = () => {
        setEditingTask(null);
        setIsModalOpen(false);
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
        <div>
            <div className="fixed-header">
                <h1>Mis Tareas</h1>
                <input
                    type="text"
                    placeholder="Buscar tareas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button
                    onClick={() => {
                        setEditingTask(null);
                        setIsModalOpen(true);
                    }}
                    className="add-task-button"
                >
                    Agregar Nueva Tarea
                </button>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingTask ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h2>
                            <button onClick={handleFormClose}>Cerrar</button>
                        </div>
                        <div className="modal-body">
                            <TaskForm existingTask={editingTask} onFormClose={handleFormClose} />
                        </div>
                    </div>
                </div>
            )}
            <div className="task-list">
                <TaskList tasks={filteredTasks} onEdit={handleEdit} onTaskUpdate={handleTaskUpdate} />
            </div>
        </div>
    );
};

export default TaskManager;
