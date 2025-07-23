let tasks = [];
let editIndex = -1;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => startEdit(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Apagar';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addOrUpdateTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Digite uma tarefa!');
    return;
  }

  if (editIndex === -1) {

    tasks.push(taskText);
  } else {

    tasks[editIndex] = taskText;
    editIndex = -1;
    addBtn.textContent = 'Adicionar';
  }

  taskInput.value = '';
  renderTasks();
}

function startEdit(index) {
  taskInput.value = tasks[index];
  editIndex = index;
  addBtn.textContent = 'Salvar';
  taskInput.focus();
}

function deleteTask(index) {
  if (confirm('Tem certeza que deseja apagar esta tarefa?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

addBtn.addEventListener('click', addOrUpdateTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addOrUpdateTask();
});

renderTasks();

function updateClock() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; 
  const brasiliaTime = new Date(utc - 3 * 3600000);

  const h = String(brasiliaTime.getHours()).padStart(2, '0');
  const m = String(brasiliaTime.getMinutes()).padStart(2, '0');
  const s = String(brasiliaTime.getSeconds()).padStart(2, '0');

  document.getElementById('clock').textContent = `Horário de Brasília: ${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);

updateClock();
