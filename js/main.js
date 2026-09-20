// Seleccion de elementos dom
const leftMenuToggle = document.getElementById('leftMenuToggle');
const leftSidebar = document.getElementById('leftSidebar');
const closeLeftSidebar = document.getElementById('closeLeftSidebar');

const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');

const sidebarOverlay = document.getElementById('sidebarOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCountBadge = document.getElementById('cartCountBadge');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const thumbnails = document.querySelectorAll('.thumb');
const mainViewerImg = document.getElementById('mainViewerImg');

// Lista para almacenar los productos del carrito
let cart = [];

// Galeria interactiva
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const imageSrc = thumb.getAttribute('data-img');
        if (mainViewerImg && imageSrc) {
            mainViewerImg.style.backgroundImage = `url('${imageSrc}')`;
        }
        thumbnails.forEach(t => t.classList.remove('thumb--active'));
        thumb.classList.add('thumb--active');
    });
});

// Abrir y cerrar menu lateral izquierdo
if (leftMenuToggle && leftSidebar) {
    leftMenuToggle.addEventListener('click', () => {
        leftSidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
    });
}

if (closeLeftSidebar) {
    closeLeftSidebar.addEventListener('click', closeAllSidebars);
}

// Abrir y cerrar menu del carrito
if (cartToggle && cartSidebar) {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
    });
}

if (closeCart) {
    closeCart.addEventListener('click', closeAllSidebars);
}

// Overlay para cerrar menus al hacer clic afuera
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeAllSidebars);
}

function closeAllSidebars() {
    if (leftSidebar) leftSidebar.classList.remove('open');
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('open');
}

// Agregar items al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name') || 'Producto';
        const price = parseFloat(button.getAttribute('data-price')) || 0;
        
        // Producto al arreglo
        cart.push({ name, price });
        
        updateCartUI();
        
        if (cartSidebar && sidebarOverlay) {
            cartSidebar.classList.add('open');
            sidebarOverlay.classList.add('open');
        }
    });
});

// Renderizar interfaz del carrito
function updateCartUI() {
    // Actualiza la burbuja del contador en la barra superior
    if (cartCountBadge) {
        cartCountBadge.textContent = cart.length;
    }

    // Si el carrito esta vacio
    if (cart.length === 0) {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        }
        if (cartTotalPrice) {
            cartTotalPrice.textContent = '$0.00';
        }
        return;
    }

    // Si hay elementos, construimos el html
    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item-row">
                <div>
                    <p class="cart-item-title">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-item-btn" data-index="${index}">&times;</button>
            </div>
        `;
    });

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = html;
    }
    
    if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Evento para eliminar elementos del carrito
    const removeButtons = cartItemsContainer.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}