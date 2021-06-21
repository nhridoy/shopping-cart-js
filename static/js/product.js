let table = document.querySelector(".all-items");
let sub_total = document.querySelector(".subtotal-price");
let discount_total = document.querySelector(".discount-price");
let grand_total = document.querySelector(".grandtotal-price");
let input_coupon = document.querySelector("#coupon-btn");
let coupon_list = ['off5', 'off10', 'off15'];

let item_no = 0;
let sub = 0;
let dis = 0;
class Product {
  constructor(product_img, product_name, product_price, product_quantity) {
    this.product_img = product_img;
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
  }
}

class Cart {
  constructor() {}

  quantityUpdate(u) {
    console.log(u);
  }

  selected(product) {
    let tr = document.createElement("tr");
    tr.className = "text-center item";
    tr.innerHTML = `
                      <th scope="row">${(item_no += 1)}</th>
                      <td><img class="img-table" src="${
                        product.product_img
                      }" alt=""></td>
                      <td>${product.product_name}</td>
                      <td>${product.product_price}</td>
                      <td id = "p-quantity"><input type="button" id="quantity-minus" value="-"> <span>${
                        product.product_quantity
                      }</span> <input type="button" id="quantity-plus" value="+"></td>
                      <td id="updated-price">${
                        product.product_price * product.product_quantity
                      }</td>
                      <td><a class="link-danger text-decoration-none" href="#">X</a></td>
          `;
    let total = product.product_price * product.product_quantity;
    table.appendChild(tr);
    sub += total;
    sub_total.innerHTML = `<b>${sub}</b>`;
    discount_total.innerHTML = `<b>${dis}</b>`;
    grand_total.innerHTML = `<b>${sub - dis}</b>`;

    let quantity_plus = document.querySelectorAll("#quantity-plus");
    let quantity_minus = document.querySelectorAll("#quantity-minus");
    let updated_price = document.querySelectorAll("#updated-price");

    quantity_minus.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (e.target.parentElement.childNodes[2].textContent > 1) {
          product.product_quantity -= 1;

          total = product.product_price * product.product_quantity;
          updated_price.innerHTML = total;
          //   console.log(updated_price);
          e.target.parentElement.nextElementSibling.innerText = total;

          e.target.parentElement.childNodes[2].innerText =
            product.product_quantity;
        }
      });
    });

    quantity_plus.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (e.target.parentElement.childNodes[2].textContent < 10) {
          product.product_quantity += 1;

          total = product.product_price * product.product_quantity;
          sub += total;
          updated_price.innerHTML = total;
          //   console.log(updated_price);
          e.target.parentElement.nextElementSibling.innerText = total;

          e.target.parentElement.childNodes[2].innerText =
            product.product_quantity;
        }
      });
    });
  }

  removeProduct(item) {
    if (item.hasAttribute("href")) {
      item.parentElement.parentElement.remove();
      // console.log(item.parentElement.previousElementSibling.textContent);
      sub -= item.parentElement.previousElementSibling.textContent;
      sub_total.innerHTML = `<b>${sub}</b>`;
      discount_total.innerHTML = `<b>${dis}</b>`;
      grand_total.innerHTML = `<b>${sub - dis}</b>`;
    }
  }

  applyCoupon(coup){
      let coupon_value = 0;
      for(let i in coupon_list){
          if(coupon_list[i] == coup){
              if(coup == coupon_list[0]){
                coupon_value = 5;
              }else if (coup == coupon_list[1]) {
                coupon_value = 10;
              } else if(coup == coupon_list[2]) {
                coupon_value = 15;
              }
          }
      }
      console.log(coupon_value);
      console.log(sub_total.childNodes[0].textContent);
      dis = ((sub_total.childNodes[0].textContent*coupon_value)/100);
    discount_total.innerHTML = `<b>${dis}</b>`;
    grand_total.innerHTML = `<b>${sub - dis}</b>`;
  }
}
