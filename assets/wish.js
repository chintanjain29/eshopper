
  document.addEventListener('DOMContentLoaded', () => {
    const productId = '{{ productId }}';
    const wishlistButton = document.getElementById(`wishlist-${productId}`);
    console.log("Hello");
    
    // Function to update button appearance
    function updateButtonAppearance() {
      if (localStorage.getItem(`wishId-${productId}`)) {
        wishlistButton.classList.add('active');
      } else {
        wishlistButton.classList.remove('active');
      }
    }
  
    // Initial check
    updateButtonAppearance();
  
    // Toggle wishlist state and update appearance
    wishlistButton.addEventListener('click', () => {
      console.log("Hello");
      if (localStorage.getItem(`wishId-${productId}`)) {
        localStorage.removeItem(`wishId-${productId}`);
      } else {
        localStorage.setItem(`wishId-${productId}`, productId);
      }
      updateButtonAppearance();
    });
  });