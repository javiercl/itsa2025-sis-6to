// Seleccionar elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Estado actual del filtro
let currentFilter = 'all';

// Cargar tareas desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    applyFilter();
});

// Manejar el envío del formulario (agregar tarea)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

// Configurar los botones de filtro
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Actualizar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Actualizar filtro actual
        currentFilter = this.getAttribute('data-filter');
        
        // Aplicar el filtro
        applyFilter();
    });
});

// Función para añadir una tarea
function addTask(text) {
    // Crear elementos
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    
    // Generar ID único basado en timestamp
    const taskId = Date.now().toString();
    taskItem.setAttribute('data-id', taskId);
    
    // Crear contenido de la tarea
    taskItem.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task-text">${text}</span>
        <button class="delete-btn">Eliminar</button>
    `;
    
    // Añadir evento para marcar como completada
    const checkbox = taskItem.querySelector('.checkbox');
    checkbox.addEventListener('change', function() {
        taskItem.classList.toggle('completed', this.checked);
        saveTasks();
        applyFilter();
    });
    
    // Añadir evento para eliminar
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
        saveTasks();
    });
    
    // Añadir a la lista
    taskList.appendChild(taskItem);
    
    // Aplicar filtro actual
    applyFilter();
}

// Función para aplicar filtro actual
function applyFilter() {
    const tasks = document.querySelectorAll('.task-item');
    
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        
        switch(currentFilter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = isCompleted ? 'flex' : 'none';
                break;
            case 'pending':
                task.style.display = !isCompleted ? 'flex' : 'none';
                break;
        }
    });
}

// Función para guardar tareas en localStorage
function saveTasks() {
    const tasks = [];
    
    document.querySelectorAll('.task-item').forEach(task => {
        const taskText = task.querySelector('.task-text').textContent;
        const isCompleted = task.classList.contains('completed');
        const taskId = task.getAttribute('data-id');
        
        tasks.push({
            id: taskId,
            text: taskText,
            completed: isCompleted
        });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach(task => {
            // Crear elementos
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            // Asignar ID
            taskItem.setAttribute('data-id', task.id);
            
            // Crear contenido de la tarea
            taskItem.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">Eliminar</button>
            `;
            
            // Añadir evento para marcar como completada
            const checkbox = taskItem.querySelector('.checkbox');
            checkbox.addEventListener('change', function() {
                taskItem.classList.toggle('completed', this.checked);
                saveTasks();
                applyFilter();
            });
            
            // Añadir evento para eliminar
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                taskItem.remove();
                saveTasks();
            });
            
            // Añadir a la lista
            taskList.appendChild(taskItem);
        });
    }
}