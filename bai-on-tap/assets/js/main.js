const products = [
  { id: 1, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, oldPrice: 3500000, isNew: false, image: "product-1.jpg" },
  { id: 2, name: "Leviosa", description: "Stylish cafe chair", price: 2500000, oldPrice: null, isNew: false, image: "product-2.jpg" },
  { id: 3, name: "Lolito", description: "Luxury big sofa", price: 7000000, oldPrice: 14000000, isNew: false, image: "product-3.jpg" },
  { id: 4, name: "Respira", description: "Outdoor bar table and stool", price: 500000, oldPrice: null, isNew: true, image: "product-4.jpg" },
  { id: 5, name: "Grifo", description: "Night lamp", price: 1500000, oldPrice: null, isNew: false, image: "product-5.jpg" },
  { id: 6, name: "Muggo", description: "Small mug", price: 150000, oldPrice: null, isNew: true, image: "product-6.jpg" },
  { id: 7, name: "Pingky", description: "Cute bed set", price: 7000000, oldPrice: 10000000, isNew: false, image: "product-7.jpg" },
  { id: 8, name: "Potty", description: "Minimalist flower pot", price: 500000, oldPrice: null, isNew: true, image: "product-8.jpg" },
  { id: 9, name: "Ardila", description: "Wooden chair", price: 1800000, oldPrice: 2200000, isNew: false, image: "product-9.jpg" },
  { id: 10, name: "Baltsar", description: "Modern sofa", price: 9000000, oldPrice: null, isNew: false, image: "product-10.jpg" },
  { id: 11, name: "Crelia", description: "Office chair", price: 3200000, oldPrice: 4000000, isNew: true, image: "product-11.jpg" },
  { id: 12, name: "Drexon", description: "Dining table", price: 8500000, oldPrice: null, isNew: false, image: "product-12.jpg" },
  { id: 13, name: "Elvara", description: "Luxury armchair", price: 4500000, oldPrice: 6000000, isNew: false, image: "product-13.jpg" },
  { id: 14, name: "Furnix", description: "Bookshelf", price: 2700000, oldPrice: null, isNew: true, image: "product-14.jpg" },
  { id: 15, name: "Garnet", description: "Decor lamp", price: 1200000, oldPrice: 1500000, isNew: false, image: "product-15.jpg" },
  { id: 16, name: "Hovira", description: "Comfort sofa", price: 11000000, oldPrice: null, isNew: false, image: "product-16.jpg" },
  { id: 17, name: "Ivara", description: "Bed frame", price: 9500000, oldPrice: 12000000, isNew: true, image: "product-17.jpg" },
  { id: 18, name: "Jorvik", description: "Wooden desk", price: 5000000, oldPrice: null, isNew: false, image: "product-18.jpg" },
  { id: 19, name: "Kendra", description: "Wardrobe", price: 7800000, oldPrice: 9500000, isNew: false, image: "product-19.jpg" },
  { id: 20, name: "Lunara", description: "Modern cabinet", price: 6200000, oldPrice: null, isNew: true, image: "product-20.jpg" }
];

const listProduct = document.querySelector('#listProduct')
const filterForm = document.querySelector('#filterForm')
const searchInput = document.querySelector('#searchInput')



const renderProducts = (productArray = [])=>{
      // 1. Kiểm tra xem phần tử chứa danh sách sản phẩm có tồn tại trong DOM hay không
    // Nếu không tồn tại thì dừng hàm để tránh lỗi
    if (!listProduct) {
        return
    }
    // 2. Khởi tạo biến dùng để chứa toàn bộ HTML của các sản phẩm
    let totalString = ''
    // 3. Duyệt qua từng sản phẩm trong mảng được truyền vào
    productArray.forEach((productData)=>{
        // 4. Với mỗi sản phẩm, tạo ra một đoạn HTML tương ứng
        // Sau đó cộng dồn (+=) vào biến totalString
        totalString += `<div class="col-3 px-4">
                        <div class="product-card">
                            <img src="${productData.image}" class="d-block product-img" alt="zxc">
                            <div class="product-info px-2 py-2">
                                <p class="product-name font-semibold">${productData.name}</p>
                                <p class="product-short-desc">${productData.description}</p>
                                <p class="product-price">
                                    <span class="current-price"> ${productData.price}đ</span>
                                  ${productData.oldPrice ? `<span class="old-price"> ${productData.oldPrice}đ</span>` : ''}
                                </p>
                            </div>
                        </div>
                    </div>`
    });
    // 5. Sau khi duyệt xong:
    // - Nếu có sản phẩm → hiển thị danh sách
    // - Nếu không có sản phẩm nào → hiển thị thông báo
    listProduct.innerHTML = totalString || '<h2 class="text-center col-12"><em>Không có sản phẩm phù hợp, vui lòng thử lại!</em></h2>'
}

renderProducts(products)

if (filterForm) {
    filterForm.addEventListener('submit', (formEvent)=>{
    if (!filterForm || !searchInput) {
        return
    }
    formEvent.preventDefault()
    const searchValue = searchInput.value

    const matchedProducts = products.filter((productData)=>{
        // cùng đưa về dạng lower case để không phân biệt chữ hoa, chữ thường
        const searchStr = String(searchValue).toLowerCase()
        const productName = String(productData.name).toLowerCase()
        return productName.includes(searchStr)
    })
    renderProducts(matchedProducts)
    
})
}