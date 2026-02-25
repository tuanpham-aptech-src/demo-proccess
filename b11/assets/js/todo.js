// Lấy thông tin người dùng điền (không được reload page)
// validate (>= 5 ký tự )
const listTasks = []
const  todoForm = document.querySelector('#todoForm')
const  todoInput = document.querySelector('#todoInput')
const  listTasksElement = document.querySelector('#listTasks')

todoForm.addEventListener('submit', (formEvent)=>{
    formEvent.preventDefault()
    const content = todoInput.value;
    if (content.trim().length < 5) {
        alert('Nội dung công việc quá ngắn.')
        return
    }
    // thêm vào danh sách gốc
    listTasks.push({
        id: new Date().getTime(),
        content: content
    })
    // xóa trắng ô input để sẵn sàng nhập liệu tiếp
    todoInput.value = ''
    // re-render lại danh sách vì vừa thay đổi
    renderTodoList(listTasks)
})


function renderTodoHTML(todo) {
    return `<div class="col-3">
                <div class="todo-card">
                    <p>${todo.content}</p>
                    <div class="todo-actions">
                        <button>Hoàn thành</button>
                        <button>Xóa</button>
                    </div>
                </div>
            </div>`
}

function renderTodoList(listTodo = []){
    let totalString = ''
    listTodo.forEach((todo)=>{
        totalString +=  renderTodoHTML(todo)
    })
    if (!totalString) {
        listTasksElement.innerHTML = `<h3 class='mx-auto'><em>Chưa có công việc nào được lên lịch.</em></h3>`
        return
    }
    listTasksElement.innerHTML = totalString
}

renderTodoList(listTasks)