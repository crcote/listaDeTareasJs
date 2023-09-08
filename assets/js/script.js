const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const tasks = document.getElementById("tasks");
const totalTasks = document.getElementById("total-tasks");
const completeTasks = document.getElementById("complete-tasks");

let taskList = [
    {id: 3, descripcion: "ir al supermercado", realizada: true}, 
    {id: 1, descripcion: "hacer la comida", realizada: true},
    {id: 2, descripcion: "lavar la ropa", realizada:false}
]
//ordenamos arreglo por si estuviesen los ids desordenados
taskList.sort((a,b)=> a.id - b.id);

addButton.addEventListener("click", ()=>{
    if (taskInput.value != "") {
        console.log(taskInput.value);
        const lengthArray = taskList.length;
        const newId = (lengthArray== 0 ) ? 1 : taskList[taskList.length-1].id + 1;
        taskList.push ({id: newId, descripcion: taskInput.value, realizada: false });
        console.log(taskList);
        renderList()
        taskInput.value = "";        
    }else{
        alert("Favor ingresar tarea")
    }
}) 

const renderList = () => {
    let html ="";   
    for (let task of taskList) {
        const checked = (task.realizada) ? 'checked="true"' : '';
        html += `<tr>
                    <th scope="row">${task.id}</th>
                    <td>${task.descripcion}</td>
                    <td><input type="checkbox" class="checkTask "onclick="changeTask(${task.id},this)" ${checked} /></td>
                    <td><button class="btn btn-danger" type="button" onclick="deleteTask(${task.id})" >X</button></td>
                </tr>`
    }
    const arrayReadyTasks = taskList.filter( element => element.realizada );
    tasks.innerHTML = html;
    totalTasks.innerHTML = `Total: <b>${taskList.length}</b>`;
    completeTasks.innerHTML = `Realizadas: <b>${arrayReadyTasks.length}</b>`
}

const changeTask = (taskId,element) =>{
    const index = taskList.findIndex( (element)=>  element.id == taskId);
    if (element.checked) {        
        taskList[index].realizada = true;
    }else{
        taskList[index].realizada = false;
    }
    console.log(taskList);
    renderList();
}

const deleteTask = (taskId) =>{    
    const index = taskList.findIndex( (element)=>  element.id == taskId);
    taskList.splice(index,1);
    renderList();
}
renderList();
