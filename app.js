const todoInput=document.querySelector(".todo-input")
const todoButton=document.querySelector(".todo-button")
const todoList=document.querySelector(".todo-list")
const filterOption=document.querySelector(".filter-todo")


document.addEventListener('DOMContentLoaded',gettodos)
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deletecheck)
filterOption.addEventListener('click',filtertodo)





function addTodo(event) {
    event.preventDefault()

    const toDodiv=document.createElement("div")
    toDodiv.classList.add('todo')

    const newtoDo=document.createElement("li")
    newtoDo.innerText=todoInput.value
    newtoDo.classList.add('todo-item')

    toDodiv.appendChild(newtoDo)

    savaLocaltodos(todoInput.value)

    const completebutton=document.createElement('button')
    completebutton.innerHTML='<i class="fas fa-check"></i>'
    completebutton.classList.add("complete-btn")
    toDodiv.appendChild(completebutton)

    const trashbutton=document.createElement('button')
    trashbutton.innerHTML='<i class="fas fa-trash"></i>'
    trashbutton.classList.add("trash-btn")
    toDodiv.appendChild(trashbutton)

    todoList.appendChild(toDodiv)

    todoInput.value=""   
    
}
function deletecheck(event) {
    const item=event.target;

    if (item.classList[0]==='trash-btn') {
        const todo=item.parentElement
        todo.classList.add('fall')
        removelocaltodos(todo)
        todo.addEventListener('transitioned',function(){
            todo.remove()
        })
        
    }

    if (item.classList[0]==="complete-btn") {
        const todo=item.parentElement
        todo.classList.toggle('completed')
    } 
}
function filtertodo(e) {
    const todos=todoList.childNodes
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display='flex'
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display='flex' 
                }else{
                    todo.style.display='none'
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display='flex'
                }else{
                    todo.style.display='none'
                }
                break;
        }   
    })

    
}


function savaLocaltodos(todo) {
    let todos;
    if (localStorage.getItem('todos')=== null) {
        todos=[]
        
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}
function gettodos() {
    let todos;
    if (localStorage.getItem('todos')=== null) {
        todos=[]
        
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {
        const toDodiv=document.createElement("div")
    toDodiv.classList.add('todo')

    const newtoDo=document.createElement("li")
    newtoDo.innerText=todo
    newtoDo.classList.add('todo-item')

    toDodiv.appendChild(newtoDo)

    

    const completebutton=document.createElement('button')
    completebutton.innerHTML='<i class="fas fa-check"></i>'
    completebutton.classList.add("complete-btn")
    toDodiv.appendChild(completebutton)

    const trashbutton=document.createElement('button')
    trashbutton.innerHTML='<i class="fas fa-trash"></i>'
    trashbutton.classList.add("trash-btn")
    toDodiv.appendChild(trashbutton)

    todoList.appendChild(toDodiv)

        
    })

    
}
function removelocaltodos(todo) {
    let todos;
    if (localStorage.getItem('todos')=== null) {
        todos=[]
        
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex=todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos',JSON.stringify(todos))

    
}



