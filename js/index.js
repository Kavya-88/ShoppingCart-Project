let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Samsung J2 Pro',
        tag: 'samsungj2pro',
        price: 1200,
        inCart: 0
    },
    {
        name: 'HP Probook',
        tag: 'hpprobook',
        price: 1600,
        inCart: 0
    },
    {
        name: 'Samsung Galaxy S20',
        tag: 'samsunggalaxys20',
        price: 1400,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
     cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
     cartItems = {
        [product.tag]: product
    }
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// total price of the items in cart
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

// display cart items on the page
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
 let productContainer = document.querySelector('.products');
 let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product"> 
            <ion-icon name="trash-outline"></ion-icon>
            <a href="#" class="btn btn-danger btn-sm delete">X</a>
            <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">
            $${item.inCart * item.price},00
            </div>
            `;
        });

        
           
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total
        </h4>
        <h4 class="basketTotal">
        $${cartCost},00
        </h4>
         `;
    }
}

onLoadCartNumbers();
displayCart();