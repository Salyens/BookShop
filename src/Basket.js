import { Helper } from "./Helper.js";
export class Basket {
  booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
    sum: 0,
  };
  total = 0;
  helper = new Helper();
  // constructor(books) {
  //   this.books = books;
  // }

  createListHTML(book) {
    const container = document.querySelector("#container");
    const th = document.querySelector("th");
    let table = document.querySelector("table");
    let id;
    let name;
    let quantity;
    let price;
    let subtotal;
    let total = 0;

    if (!table) table = document.createElement("table");

    const createHeader = () => {
      if (!th) {
        this.helper.createCell(
          container,
          table,
          "th",
          "Id",
          "Product name",
          "Quantity",
          "Price",
          "Subtotal"
        );
      }
    };
    createHeader();

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
        container,
        table,
        "td",
        id,
        name,
        quantity,
        price,
        subtotal
      );
    };
    createTD();
    // this.createTotal();
  }

  countSubtotals() {}

  createTotal() {
    this.total = 0;
    const subtotals = document.querySelectorAll(".subtotal");
    for (const el of subtotals) {
      if (Number(el.innerText)) this.total += +el.innerText;
    }
    console.log(this.total);
    this.helper.createTotalPrice(this.total, container);
  }

  changeAmount() {}

  listenMinus() {
    let quantityMinus = document.querySelectorAll(".quantity-minus");
    for (const el of quantityMinus) {
      el.addEventListener("click", (event) => {
        let row = event.target.parentElement.parentElement.parentElement;
        const idBook = row.getAttribute("id");
        let quantityAmount = row.querySelector(".quantity-amount");
        let subtotal = row.querySelector(".subtotal");
        let price = +row.querySelectorAll("td")[3].innerText;

        this.booksIdInBasket[idBook]--;
        this.booksIdInBasket.sum--;

        subtotal.innerText = price * this.booksIdInBasket[idBook];
        this.createTotal();

        if (this.booksIdInBasket[idBook] < 1) {
          row.remove();
          delete this.booksIdInBasket[idBook];
        }

        quantityAmount.innerText = this.booksIdInBasket[idBook];

        localStorage.setItem(
          "booksIdInBasket",
          JSON.stringify(this.booksIdInBasket)
        );
      });
    }
  }
}
