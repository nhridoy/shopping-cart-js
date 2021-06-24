/*============Creating object of Cart Class============*/
let cart = new Cart();
/*============Add to Cart Event Listener============*/
addToCartBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    let product_img = e.target.parentElement.childNodes[1].getAttribute("src");
    let product_name_span = e.target.parentElement.childNodes[3];
    let product_name = product_name_span.childNodes[0].textContent;
    let product_price = Number(product_name_span.childNodes[2].textContent);

    let product = new Product(product_img, product_name, product_price);
    cart.checkItem(product);

    e.preventDefault();
  });
});

/*============Increment/Decrement/Delete Event Listener============*/
table.addEventListener("click", (e) => {
  cart.tableFunctions(e.target);
  e.preventDefault();
});

/*============Insert Coupon Event Listener============*/
input_coupon.addEventListener("click", (e) => {
  let coup = document.querySelector("#coupon-text").value;
  cart.applyCoupon(coup);
  e.preventDefault();
});
