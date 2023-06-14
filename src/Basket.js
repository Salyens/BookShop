import { Helper } from "./Helper.js";
export class Basket {
  booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
    sum: 0,
  };
  total = 0;
  helper = new Helper();
  table = document.createElement("table");

  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  createHeader() {
    this.helper.createCell(
      this.rootElement,
      this.table,
      "th",
      "Id",
      "Product name",
      "Quantity",
      "Price",
      "Subtotal"
    );
  }

  createRow(book) {
    let id;
    let name;
    let quantity;
    let price;
    let subtotal;
    let total = 0;

    const createTD = () => {
      for (const key in book) {
        id = book.id;
        name = book.name;
        quantity = book.amount;
        price = book.price;
        subtotal = price * quantity;
      }
      total += subtotal;

      this.helper.createCell(
        this.rootElement,
        this.table,
        "td",
        id,
        name,
        quantity,
        price,
        subtotal
      );
    };
    createTD();
  }

  createTotal() {
    this.total = 0;
    const subtotals = document.querySelectorAll(".subtotal");
    for (const el of subtotals) {
      if (Number(el.innerText)) this.total += +el.innerText;
    }
    this.helper.createTotalPrice(this.total, this.rootElement);
  }

  createPlusAndMinus(basketCounter) {
    const changeAmount = (plusORminus) => {
      let quantityItems;
      if (plusORminus === "minus") {
        quantityItems = document.querySelectorAll(".quantity-minus");
      } else if (plusORminus === "plus") {
        quantityItems = document.querySelectorAll(".quantity-plus");
      }
      for (const el of quantityItems) {
        el.addEventListener("click", (event) => {
          let row = event.target.parentElement.parentElement.parentElement;
          const idBook = row.getAttribute("id");
          let quantityAmount = row.querySelector(".quantity-amount");
          let subtotal = row.querySelector(".subtotal");
          let price = +row.querySelectorAll("td")[3].innerText;
          if (plusORminus === "minus") {
            this.booksIdInBasket[idBook]--;
            this.booksIdInBasket.sum--;
            if (this.booksIdInBasket[idBook] < 1) {
              row.remove();
              delete this.booksIdInBasket[idBook];
            }
          } else if (plusORminus === "plus") {
            this.booksIdInBasket[idBook]++;
            this.booksIdInBasket.sum++;
          }
          basketCounter.innerHTML = this.booksIdInBasket.sum;
          if (this.booksIdInBasket.sum < 1)
            basketCounter.style.cssText = "display: none;";
          subtotal.innerText = price * this.booksIdInBasket[idBook];
          quantityAmount.innerText = this.booksIdInBasket[idBook];
          this.createTotal();
          localStorage.setItem(
            "booksIdInBasket",
            JSON.stringify(this.booksIdInBasket)
          );
        });
      }
    };
    changeAmount("minus");
    changeAmount("plus");
  }
}
