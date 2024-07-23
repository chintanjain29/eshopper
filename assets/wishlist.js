document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', function() {
        let productId = this.getAttribute('data-product-id');
        let wish=JSON.parse(localStorage.getItem('wishlist'))||[];
        let exists=wish.some((item)=>{
          return item.id===productId;
        });
        if(!exists){
          alert("Product Added to Your Wishlist");
          wish.push({
            id:productId,
            d:info
          });
          localStorage.setItem('wishlist',JSON.stringify(wish));
          button.innerHTML="Added to Wishlist";
        }
      else{
          alert("Product already exist in Wishlist");
        }
    });
  });