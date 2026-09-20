// seleccion de elementos dom
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

let cart = [];

// galeria interactiva
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

// abrir y cerrar menu lateral izquierdo
leftMenuToggle.addEventListener('click', () => {
    leftSidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
});

closeLeftSidebar.addEventListener('click', closeAllSidebars);

// abrir y cerrar menu del carrito
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
});

closeCart.addEventListener('click', closeAllSidebars);

// overlay para cerrar menus
sidebarOverlay.addEventListener('click', closeAllSidebars);

function closeAllSidebars() {
    leftSidebar.classList.remove('open');
    cartSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
}

// agregar items al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        cart.push({ name, price });
        updateCartUI();
        
        // abrir carrito al agregar
        cartSidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
    });
});

// renderizar interfaz del carrito
function updateCartUI() {
    cartCountBadge.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }

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

    cartItemsContainer.innerHTML = html;
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;

    // evento para eliminar items individualmente
    const removeButtons = cartItemsContainer.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}