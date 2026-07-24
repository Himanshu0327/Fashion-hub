// ── cart.js — Shared cart state & navbar renderer ──────────────────────────

(function () {
  /* ── State ── */
  const STORAGE_KEY = 'fashionhub_cart';
  let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  /* ── Public API ── */
  window.FashionHub = {
    getCart: () => cart,
    addItem(product) {
      const idx = cart.findIndex(i => i.id === product.id && i.size === product.size);
      if (idx >= 0) {
        cart[idx].qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      saveCart();
      this.renderSidebar();
      this.updateBadge();
      showToast(`${product.name} added to cart`);
    },
    removeItem(id, size) {
      cart = cart.filter(i => !(i.id === id && i.size === size));
      saveCart();
      this.renderSidebar();
      this.updateBadge();
    },
    changeQty(id, size, delta) {
      const idx = cart.findIndex(i => i.id === id && i.size === size);
      if (idx < 0) return;
      cart[idx].qty = Math.max(1, cart[idx].qty + delta);
      saveCart();
      this.renderSidebar();
    },
    getTotal() {
      return cart.reduce((s, i) => s + i.price * i.qty, 0);
    },
    getTotalQty() {
      return cart.reduce((s, i) => s + i.qty, 0);
    },
    updateBadge() {
      const badge = document.querySelector('.cart-badge');
      if (!badge) return;
      const qty = this.getTotalQty();
      badge.textContent = qty;
      badge.classList.toggle('visible', qty > 0);
    },
    openCart() {
      document.querySelector('.cart-overlay')?.classList.add('open');
      document.querySelector('.cart-sidebar')?.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    closeCart() {
      document.querySelector('.cart-overlay')?.classList.remove('open');
      document.querySelector('.cart-sidebar')?.classList.remove('open');
      document.body.style.overflow = '';
    },
    renderSidebar() {
      const body = document.querySelector('.cart-body');
      if (!body) return;
      if (cart.length === 0) {
        body.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty-icon">🛍️</div>
            <h3>Your cart is empty</h3>
            <p>Discover our curated collections and add your favourites.</p>
            <a href="shop.html" class="btn-primary btn-sm" style="margin-top:12px">Shop Now</a>
          </div>`;
      } else {
        body.innerHTML = cart.map(item => `
          <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
            <img class="cart-item-img" src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-variant">Size: ${item.size}</div>
              <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
              <div class="qty-controls">
                <button class="qty-btn" onclick="FashionHub.changeQty('${item.id}','${item.size}',-1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="FashionHub.changeQty('${item.id}','${item.size}',1)">+</button>
              </div>
            </div>
            <button class="cart-item-remove" onclick="FashionHub.removeItem('${item.id}','${item.size}')">✕</button>
          </div>`).join('');
      }
      // Update total
      const tv = document.querySelector('.cart-subtotal-value');
      if (tv) tv.textContent = '₹' + this.getTotal().toLocaleString();
    }
  };

  /* ── Navbar HTML ── */
  function injectNavbar(activePage) {
    const pages = [
      { href: 'index.html', label: 'Home' },
      { href: 'shop.html', label: 'Shop' },
      { href: 'collections.html', label: 'Collections' },
      { href: 'about.html', label: 'About' },
      { href: 'contact.html', label: 'Contact' },
    ];
    const links = pages.map(p =>
      `<a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a>`
    ).join('');

    document.getElementById('navbar-root').innerHTML = `
      <nav class="navbar">
        <a href="index.html" class="nav-logo">FASHION<span>HUB</span></a>
        <div class="nav-links">${links}</div>
        <div class="nav-actions">
          <button class="nav-icon-btn" title="Search">🔍</button>
          <button class="nav-icon-btn" title="Wishlist">♡</button>
          <button class="nav-icon-btn" title="Cart" onclick="FashionHub.openCart()">
            🛒
            <span class="cart-badge" id="cartBadge"></span>
          </button>
          <button class="hamburger" id="hamburgerBtn">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>`;

    window.FashionHub.updateBadge();

    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
      document.querySelector('.nav-links').style.display =
        document.querySelector('.nav-links').style.display === 'flex' ? 'none' : 'flex';
    });
  }

  /* ── Cart Sidebar HTML ── */
  function injectCartSidebar() {
    const el = document.createElement('div');
    el.innerHTML = `
      <div class="cart-overlay" onclick="FashionHub.closeCart()"></div>
      <aside class="cart-sidebar">
        <div class="cart-header">
          <div class="cart-title">Your Cart <span class="cart-count-label" id="cartCountLabel"></span></div>
          <button class="cart-close" onclick="FashionHub.closeCart()">✕</button>
        </div>
        <div class="cart-body"></div>
        <div class="cart-footer">
          <div class="cart-subtotal">
            <span class="cart-subtotal-label">Subtotal</span>
            <span class="cart-subtotal-value">₹0</span>
          </div>
          <p class="cart-shipping-note">✦ Free shipping on orders over ₹2,999</p>
          <div class="cart-cta">
            <a href="payment.html" class="btn-primary btn-full">Proceed to Checkout</a>
            <button class="btn-outline btn-full" onclick="FashionHub.closeCart()">Continue Shopping</button>
          </div>
        </div>
      </aside>`;
    document.body.appendChild(el);
    window.FashionHub.renderSidebar();
  }

  /* ── Toast ── */
  function showToast(msg) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✦</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }
  window.showToast = showToast;

  /* ── Auto-init ── */
  document.addEventListener('DOMContentLoaded', () => {
    const activePage = location.pathname.split('/').pop() || 'index.html';
    if (document.getElementById('navbar-root')) injectNavbar(activePage);
    injectCartSidebar();
    window.FashionHub.updateBadge();
  });
})();
