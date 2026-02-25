const user_accounts = JSON.parse(localStorage.getItem('accounts')) || [];

function databaseQueryUser(payload) {
    const userFromDB = user_accounts.find((user) => {
        return user.username === payload.username && user.password === payload.password
    }) // null hoặc 1 item
    return {
        success: !!userFromDB,
        data: userFromDB
    }
}
function databaseQueryUsername(payload) {
    const userFromDB = user_accounts.find((user) => {
        return user.username === payload.username
    }) // null hoặc 1 item
    return {
        success: !userFromDB,
        data: userFromDB
    }
}

// Lấy thông tin từ form
const userNameInput = document.querySelector('#username')
const userPasswordInput = document.querySelector('#password')
const loginForm = document.querySelector('#loginForm')

const registerForm = document.querySelector('#registerForm')
const registerUsernameInput = document.querySelector('#registerUsername')
const registerPasswordInput = document.querySelector('#registerPassword')

loginForm.addEventListener('submit', (formEvent) => {
    formEvent.preventDefault()
    // handler
    // in ra object thông tin người dùng gửi lên với dạng sau:
    // Validate & format
    const payload = {
        username: userNameInput.value.trim(),
        password: userPasswordInput.value.trim(),
    }
    const errors = {};
    if (!payload.username) {
        errors.username = 'Tên đăng nhập không được để trống';
    }
    if (!payload.password) {
        errors.password = 'Mật khẩu không được để trống'
    }
    if (Object.keys(errors).length) {
        handleErrors(errors)
        return
    }

    console.log(payload);
    // kiểm tra database xem có đúng tài khoản không
    const response = databaseQueryUser(payload)

    if (!response.success) {
        alert('Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại !')
        return
    }
    // trả thông tin người dùng, lưu lại token để lần sau không phải đăng nhập nữa ....
    
    alert('Đăng nhập thành công !')
    localStorage.setItem('userInfo', JSON.stringify(response.data))
})

function handleErrors(errors) {
    if (errors.username) {
        userNameInput.classList.add('error-input')
    }
    if (errors.password) {
        userPasswordInput.classList.add('error-input')
    }
    alert(Object.values(errors).join(' ,'))
}

// dùng js để xử lý đăng ký cho người dùng. với rules:
// - không được trùng username
// - username và password không chứa dấu space và có ít nhất 5 ký tự
// - sau khi đăng ký thành công, lưu lại thông tin tài khoản, cho phép đăng nhập bình thường bằng tài khoản vừa đăng ký
registerForm.addEventListener('submit', (formEvent) => {
    formEvent.preventDefault()
    // handler
    // in ra object thông tin người dùng gửi lên với dạng sau:
    // Validate & format
    const payload = {
        username: registerUsernameInput.value.trim(),
        password: registerPasswordInput.value.trim(),
    }
    const errors = {};
    if (payload.username.length < 5) {
        errors.username = 'Tên đăng nhập phải có ít nhất 5 ký tự';
    }
    if (payload.password.length < 5) {
        errors.password = 'Mật khẩu phải có ít nhất 5 ký tự';
    }

    if (Object.keys(errors).length) {
        handleErrors(errors)
        return
    }

    console.log(payload);
    // kiểm tra database xem có đúng tài khoản không
    const response = databaseQueryUsername(payload)

    if (!response.success) {
        alert('Tên tài khoản đã được sử dụng. Vui lòng kiểm tra lại !')
        return
    }
    // trả thông tin người dùng, lưu lại token để lần sau không phải đăng nhập nữa ....
    
    handlerRegisterSuccess(payload)
})

function handlerRegisterSuccess(payload) {
    alert('Đăng ký thành công !')
    user_accounts.push(payload)
    localStorage.setItem('accounts', JSON.stringify(user_accounts))
    renderUserList(user_accounts)
}

// render list data

const listUserContainer = document.querySelector('#listUserContainer');

const btnString = '<button type="submit" class="d-flex mx-auto items-center gap-x-2 bg-primary-300 text-white header-btn rounded-xl"><span>Đăng ký</span></button>'

const parseDataToHTML = (userData)=>{
    return `<div class="col-3">
                                <div class="user-card" style="border: 1px solid; border-radius: 4px; padding: 12px;">
                                    <p>Tên tài khoản: ${userData.username}</p>
                                    <p>Mật khẩu: ${userData.password}</p>
                                 </div>
                            </div>`
}

const renderUserList = (user_list)=>{
    let totalString = ''
    user_list.forEach((userData)=>{
        totalString += parseDataToHTML(userData);
    })

    if (!totalString) {
        listUserContainer.innerHTML= '<p>Chưa có người dùng nào, đăng ký ngay !</p>'
        return
    }
    listUserContainer.innerHTML = totalString
}

renderUserList(user_accounts)

// Viết hàm lấy danh sách user từ localStorage và render toàn bộ ra màn hình
