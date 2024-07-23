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