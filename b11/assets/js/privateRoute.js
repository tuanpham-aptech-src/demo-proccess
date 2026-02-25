const userInfo = JSON.parse(localStorage.getItem('userInfo')) // do getItem() trả về JSON nên cần parse ra trước

const isAuthenticated = !!userInfo

if (!isAuthenticated) {
    alert('Vui lòng đăng nhập');
    window.location.href='/index.html'
}

const logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('userInfo')
    window.location.href='/index.html'
})