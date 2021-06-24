/*============All Button Query Selector============*/
let addToCartBtn = document.querySelectorAll(".add");
let table = document.querySelector(".all-items");
let sub_total = document.querySelector(".subtotal-price");
let discount_total = document.querySelector(".discount-price");
let grand_total = document.querySelector(".grandtotal-price");
let input_coupon = document.querySelector("#coupon-btn");
let coupon_list = ["off5", "off10", "off15"];

let item_no = 0;
let sub = 0;
let dis = 0;
/*============Product Class============*/
class Product {
  constructor(product_img, product_name, product_price) {
    this.product_img = product_img;
    this.product_name = product_name;
    this.product_price = product_price;
  }
}
/*============Cart Class============*/
class Cart {
  constructor() {}

  /*============Checking if Cart is empty or not============*/
  checkItem(product) {
    let item = document.querySelectorAll(".item-name");

    for (let i = 0; i < item.length; i++) {
      if (item[i].innerText == product.product_name) {
        alert("This item is already added to the cart");
        return;
      }
    }
    this.addToCart(product);
  }

  /*============Adding Product to Cart============*/
  addToCart(product) {
    let tr = document.createElement("tr");
    tr.className = "text-center item";
    tr.innerHTML = `
                      <th scope="row">${(item_no += 1)}</th>
                      <td><img class="img-table" src="${
                        product.product_img
                      }" alt=""></td>
                      <td class="item-name">${product.product_name}</td>
                      <td>${product.product_price}</td>
                      <td id = "p-quantity"><input type="button" id="quantity-minus" value="-"> <span class="item-quantity">1</span> <input type="button" id="quantity-plus" value="+"></td>
                      <td id="updated-price">${product.product_price}</td>
                      <td><a class="link-danger text-decoration-none" href="#">X</a></td>
          `;

    let total = product.product_price;
    table.appendChild(tr);

    this.totalPricePlus(total);
  }

  /*============Increment/Decrement/Delete============*/
  tableFunctions(row) {
    if (row.hasAttribute("href")) {
      this.removeProduct(row);
    } else if (row.hasAttribute("value")) {
      this.incrementDecrement(row);
    }
  }

  /*============Increment/Decrement============*/
  incrementDecrement(item) {
    let old_price = Number(
      item.parentElement.parentElement.childNodes[7].textContent
    );
    if (item.getAttribute("value") == "-") {
      let item_quantity = Number(item.parentElement.childNodes[2].textContent);
      if (item_quantity > 1) {
        item_quantity--;
        item.parentElement.childNodes[2].innerText = item_quantity;
        this.updatePrice(item_quantity, item, old_price);
        this.totalPriceMinus(old_price);
      }
    } else if (item.getAttribute("value") == "+") {
      let item_quantity = Number(item.parentElement.childNodes[2].textContent);
      if (item_quantity < 10) {
        item_quantity++;
        item.parentElement.childNodes[2].innerText = item_quantity;
        this.updatePrice(item_quantity, item, old_price);
        this.totalPricePlus(old_price);
      }
    }
  }

  /*============Updating Quantity Price============*/
  updatePrice(item_quantity, item, old_price) {
    let new_price = old_price * item_quantity;
    item.parentElement.parentElement.childNodes[11].innerText = new_price;
  }

  /*============Delete from Cart============*/
  removeProduct(item) {
    if (item.hasAttribute("href")) {
      item.parentElement.parentElement.remove();
      let removed_price = Number(
        item.parentElement.previousElementSibling.textContent
      );
      this.totalPriceMinus(removed_price);
    }
  }

  /*============Decresing Total Price============*/
  totalPriceMinus(new_price, dis = 0) {
    sub -= new_price;

    sub_total.innerHTML = `<b>${sub}</b>`;
    discount_total.innerHTML = `<b>${dis}</b>`;
    grand_total.innerHTML = `<b>${sub - dis}</b>`;
  }

  /*============Incresing Total Price============*/
  totalPricePlus(new_price, dis = 0) {
    sub += new_price;

    sub_total.innerHTML = `<b>${sub}</b>`;
    discount_total.innerHTML = `<b>${dis}</b>`;
    grand_total.innerHTML = `<b>${sub - dis}</b>`;
  }

  /*============Applying Coupon============*/
  applyCoupon(coup) {
    let item = document.querySelectorAll(".item-name");

    if (item.length == 0) {
      alert("Add item to cart first!");
    } else {
      let coupon_value = 0;
      for (let i in coupon_list) {
        if (coupon_list[i] == coup) {
          if (coup == coupon_list[0]) {
            coupon_value = 5;
          } else if (coup == coupon_list[1]) {
            coupon_value = 10;
          } else if (coup == coupon_list[2]) {
            coupon_value = 15;
          }
        }
      }
      dis = (sub_total.childNodes[0].textContent * coupon_value) / 100;
      discount_total.innerHTML = `<b>${dis}</b>`;
      grand_total.innerHTML = `<b>${sub - dis}</b>`;
    }
  }
}
