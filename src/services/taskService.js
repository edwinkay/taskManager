const API_URL = 'http://localhost:5000/tasks'; // URL del servidor

// Obtener todas las tareas (GET)
export const fetchTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener las tareas');
    }
    return await response.json();
};

// Agregar una nueva tarea (POST)
export const addTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error('Error al agregar la tarea');
    }
    return await response.json();
};

// Actualizar una tarea existente (PUT)
export const updateTask = async (taskId, updatedTask) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
    }
    return await response.json();
};

// Eliminar una tarea (DELETE)
export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
    }
    return;
};
