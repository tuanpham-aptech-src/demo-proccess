const btnToggleSidebar = document.querySelector('#btnToggleSidebar');
const sidebar = document.querySelector('#sidebar');
if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click',()=>{
        if (sidebar) {
            sidebar.classList.toggle('mini')
        }
       
    })
}


// Lấy ra danh sách các ảnh con
const listSmallImages = [...document.querySelectorAll('.preview-small-img')]
const fullSizeImg = document.querySelector('#fullSizeImg')

// Kiểm tra xem có ảnh không, nếu có thì gán ảnh đầu tiên
if (fullSizeImg && listSmallImages.length) {
    fullSizeImg.setAttribute('src', listSmallImages[0].getAttribute('src'))
}

// Gán sự kiện vào từng đối tượng với logic: 
listSmallImages.forEach((imgElement, index)=>{
    imgElement.addEventListener('click',()=>{
        // == khi click thì lấy attribute src
        const currentSrc = imgElement.getAttribute('src')
        // == gán lại cho thẻ fullSizeImg
        if (fullSizeImg) {
            fullSizeImg.setAttribute('src', currentSrc)
        }
        // thêm border bằng cách thêm class
        // -- Xóa các active hiện tại
        removeAllActiveImage()
        // -- thêm active vào đối tượng được click
        imgElement.classList.add('active')
    })
})


const removeAllActiveImage = ()=>{
   const allActiveImg = [...document.querySelectorAll('.preview-small-img.active')];
    allActiveImg.forEach((item)=>{item.classList.remove('active')})
}