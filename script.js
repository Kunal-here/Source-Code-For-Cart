// HAMBURGER
const hamburger = document.querySelector("#hamburger")
const ul = document.querySelector("ul")
hamburger.addEventListener(("click"),()=> {
    ul.classList.toggle("visible")
})
// ---------
document.addEventListener('DOMContentLoaded', function() {

// TO SHOW ALL THE DATA DYNAMICALLY
let allProductList = [];
const product = document.querySelector('#shop');
const everyProduct = ()=> {
    product.innerHTML = "";
    if(allProductList.length > 0){
        allProductList.forEach(item=>{
            let newAllProduct = document.createElement('div');
            newAllProduct.classList.add("product");
            newAllProduct.dataset.id = item.id;
            newAllProduct.innerHTML = `
            <img class="productImg" src="${item.image}" alt="">
                <div class="productData">
                    <p>${item.brand}</p>
                    <h4>${item.name}</h4>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h5>${item.price}</h5>
                    <h5>View Product<h5>
                    <i class="cartHere fa-solid fa-cart-shopping"></i>
                </div>`;
                product.appendChild(newAllProduct);
                newAllProduct.addEventListener('click',()=>{
                    localStorage.setItem('selectedProduct',JSON.stringify(item));
                    // window.location.href = 'productDetail.html';
                })   
        })
    }  
}
let allProduct = () => {
    fetch('product.json')
    .then(response => response.json())
    .then(data => {
        allProductList = data; 
    });

    fetch('newArrival.json')
    .then(response => response.json())
    .then(data => {
        allProductList = [...allProductList, ...data];
        everyProduct();
    });
}
allProduct();
// CART
product.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains("cartHere")){
        let productElement = positionClick.closest('.product');
        let productDetails = {
            id: productElement.dataset.id,
            image: productElement.querySelector('.productImg').src,
            brand: productElement.querySelector('.productData p').textContent,
            name: productElement.querySelector('.productData h4').textContent,
            price: productElement.querySelector('.productData h5').textContent,
        };
        addToCart(productDetails);
    }
})
carts = JSON.parse(localStorage.getItem('carts')) || [];
// ADD PRODUCT TO CART
const addToCart = (productDetails) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == productDetails.id);
    if(carts.length <= 0 || positionThisProductInCart < 0){
        carts.push({
            image:productDetails.image,
            product_id: productDetails.id,
            name: productDetails.name,
            price:productDetails.price,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    // console.log(carts);
    localStorage.setItem('carts', JSON.stringify(carts));
    updateCartValue();
}
const updateCartValue = () => {
    const cartValueElement = document.getElementById('cartValue');
    let cartTotal = 0
    if (cartValueElement) {
        for(let i =0;i<carts.length;i++){
            cartTotal += carts[i].quantity
        }
        cartValueElement.textContent = cartTotal;
        }   
};
updateCartValue();
});










