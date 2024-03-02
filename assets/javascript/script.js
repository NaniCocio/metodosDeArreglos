const newTaskInput = document.querySelector ("input");
const tbody = document.querySelector ("tbody");
const btn = document.querySelector ("button");

const totalSpan = document.getElementById("total");
const realizadasSpan = document.getElementById ("realizadas");
const pendientesSpan = document.getElementById("pendientes");

const tareas = [];

let resumen ={
    total: 0,
    realizadas: 0,
    pendientes: 0,
};


btn.addEventListener ("click", () => {
    if (newTaskInput.value) {
        addTask (newTaskInput.value);
        refresh();
    } else {
        alert("Debe escribir una nueva tarea");
    }
});

const addTask = (newTask) => {
    const id = Math.floor(Math.random() * 99);
    const tarea = {
        id,
        tarea: newTask,
        check: false
    };
    tareas.push(tarea);
    newTaskInput.value = "";
};

const checkInput = (id) => {
    const tarea = tareas.find((tarea) => tarea.id === id);
    const { check } = tarea;
    tarea.check= !check;
    refresh();
};

const editTask = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    const nuevaDescripcion = prompt("Editar tarea: " , tarea.tarea);
    tarea.tarea = nuevaDescripcion;
    refresh();
};

const deleteTask = (id) => {
    const decision = confirm("¿Seguro que quieres eliminar la tarea?");
    if (decision){
        const index = tareas.findIndex((tarea) => tarea.id === id);
        tareas.splice(index, 1);
        refresh();
    }
};

const fillTable = ()  => {
    tareas.forEach((tarea) => {
        const row = `
        <tr>
            <td>${tarea.id}</td>
            <td>${tarea.tarea}</td>
            <td class="x-delete">
                <input onchange="checkInput(${tarea.id})" ${tarea.check ? "checked" : ""} type= "checkbox" />
                <span onclick="editTask(${tarea.id})">📝</span>
                <span onclick="deleteTask(${tarea.id})">❎</span>
            </td>
        </tr>
        `;
        tbody.innerHTML += row;
    }); 
};

const clearTable = () => (tbody.innerHTML = "");

const calculateResumen = () => {
    let total = tareas.length;
    let realizadas = 0;
    let pendientes = 0;

    for (let tarea of tareas) {
        if (tarea.check){
            realizadas++;
        } else {
            pendientes++;
        }
    }

    resumen = {total: total, realizadas: realizadas, pendientes: pendientes};
};


const updateResumen = () => {
    totalSpan.innerHTML = resumen.total;
    realizadasSpan.innerHTML = resumen.realizadas;
    pendientesSpan.innerHTML = resumen.pendientes;
};

const refresh = () => {
    clearTable();
    fillTable ();
    calculateResumen();
    updateResumen();
};