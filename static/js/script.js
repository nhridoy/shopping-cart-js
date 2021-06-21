let addToCartBtn = document.querySelectorAll(".add");

let cart = new Cart();
// console.log(addToCartBtn);
addToCartBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    let product_img = e.target.parentElement.childNodes[1].getAttribute("src");
    let product_name_span = e.target.parentElement.childNodes[3];
    let product_name = product_name_span.childNodes[0].textContent;
    let product_price = product_name_span.childNodes[2].textContent;
    let product_quantity = 1;
    let product = new Product(
      product_img,
      product_name,
      product_price,
      product_quantity
    );

    cart.selected(product);

    e.preventDefault();

    // let quantity_plus = document.querySelectorAll("#quantity-plus");
    // let quantity_minus = document.querySelectorAll("#quantity-minus");
    // console.log(quantity_plus);
    // // let plus = [];
    // // let minus = [];
    // quantity_minus.forEach((element) => {
    //   element.addEventListener("click", (e) => {
    //     //   console.log(e.target.parentElement.childNodes[2].textContent);
    //     if (e.target.parentElement.childNodes[2].textContent > 1) {
    //       product_quantity -= 1;
    //       e.target.parentElement.childNodes[2].innerText = product_quantity;
    //     }

    //     //   console.log(product_quantity);
    //   });
    // });

    // quantity_plus.forEach((element) => {
    //   element.addEventListener("click", (e) => {
    //     //   console.log(e.target.parentElement.childNodes[2].textContent);
    //     if (e.target.parentElement.childNodes[2].textContent < 10) {
    //       product_quantity += 1;
    //       e.target.parentElement.childNodes[2].innerText = product_quantity;
    //     }
    //     //   console.log(product_quantity);
    //   });
    // });
  });
});


table.addEventListener('click', (e) => {
    cart.removeProduct(e.target);
    e.preventDefault();
})

input_coupon.addEventListener('click', (e) => {
    let coup = document.querySelector('#coupon-text').value;
    cart.applyCoupon(coup);
    e.preventDefault();
})