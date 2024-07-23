class Wishlist {
    constructor() {
      this.storageKey = 'shopify_wishlist';
      this.wishlist = this.getWishlist();
      this.setupEventListeners();
      this.updateAllButtons();
    }
  
    setupEventListeners() {
      document.addEventListener('click', (event) => {
        const wishlistButton = event.target.closest('.wishlist-button');
        if (wishlistButton) {
          this.toggleWishlistItem(wishlistButton);
        }
      });
    }
  
    getWishlist() {
      const wishlist = localStorage.getItem(this.storageKey);
      return wishlist ? JSON.parse(wishlist) : [];
    }
  
    saveWishlist() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
    }
  
    toggleWishlistItem(button) {
      const productId = button.dataset.productId;
      const index = this.wishlist.indexOf(productId);
  
      if (index === -1) {
        this.wishlist.push(productId);
      } else {
        this.wishlist.splice(index, 1);
      }
  
      this.saveWishlist();
      this.updateButton(button);
    }
  
    updateAllButtons() {
      const buttons = document.querySelectorAll('.wishlist-button');
      buttons.forEach(button => this.updateButton(button));
    }
  
    updateButton(button) {
      const productId = button.dataset.productId;
      const inWishlist = this.wishlist.includes(productId);
      button.classList.toggle('in-wishlist', inWishlist);
    }
  }
  
  // Initialize the wishlist
  document.addEventListener('DOMContentLoaded', () => {
    new Wishlist();
  });




  /***********************/

  class Wishlist {
    // ... (previous code remains the same)
  
    async loadWishlistItems() {
      const container = document.getElementById('wishlist-container');
      if (!container) return;
  
      container.innerHTML = 'Loading wishlist items...';
  
      const items = await this.fetchWishlistItems();
  
      if (items.length === 0) {
        container.innerHTML = '<p>Your wishlist is empty.</p>';
      } else {
        container.innerHTML = items.map(item => this.createProductCard(item)).join('');
      }
    }
  
    async fetchWishlistItems() {
      const productIds = this.getWishlist();
      if (productIds.length === 0) return [];
  
      const response = await fetch('/recommendations/products.json?product_ids=' + productIds.join(','));
      const data = await response.json();
      return data.products;
    }
  
    createProductCard(product) {
      return `
        <div class="grid__item small--one-half medium-up--one-quarter">
          <div class="grid-view-item">
            <a href="${product.url}" class="grid-view-item__link">
              <img src="${product.featured_image}" alt="${product.title}" class="grid-view-item__image">
              <div class="h4 grid-view-item__title">${product.title}</div>
              <div class="grid-view-item__meta">
                ${this.formatMoney(product.price)}
              </div>
            </a>
            <button class="btn wishlist-remove" data-product-id="${product.id}">Remove from Wishlist</button>
          </div>
        </div>
      `;
    }
  
    formatMoney(cents) {
      return '$' + (cents / 100).toFixed(2);
    }
  
    setupEventListeners() {
      // ... (previous event listeners)
      document.addEventListener('click', (event) => {
        if (event.target.classList.contains('wishlist-remove')) {
          const productId = event.target.dataset.productId;
          this.removeFromWishlist(productId);
        }
      });
    }
  
    removeFromWishlist(productId) {
      const index = this.wishlist.indexOf(productId);
      if (index !== -1) {
        this.wishlist.splice(index, 1);
        this.saveWishlist();
        this.loadWishlistItems(); // Reload the wishlist page
      }
    }
  }
  
  // Initialize the wishlist
  document.addEventListener('DOMContentLoaded', () => {
    const wishlist = new Wishlist();
    if (document.getElementById('wishlist-container')) {
      wishlist.loadWishlistItems();
    }
  });