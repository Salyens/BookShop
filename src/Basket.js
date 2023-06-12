import { Helper } from "./Helper.js";
export class Basket {
  booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
    sum: 0,
  };
  constructor(books) {
    this.books = books;
  }

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
    const helper = new Helper("222");

    if (!table) table = document.createElement("table");

    const createHeader = () => {
      if (!th) {
        helper.createCell(
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

      helper.createCell(
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

    const createTotal = () => {
      const subtotals = document.querySelectorAll(".subtotal");
    
      helper.createTotalPrice(subtotals, container);
    };
    createTotal();
  }

  listenMinus() {
    let quantityMinus = document.querySelectorAll(".quantity-minus");
    for (const el of quantityMinus) {
      el.addEventListener("click", (event) => {
        const idBook =
          event.target.parentElement.parentElement.parentElement.getAttribute(
            "id"
          );
        let quantity = event.target.parentElement.parentElement;
        let quantityAmount = quantity.querySelector(".quantity-amount");
        
        this.booksIdInBasket[idBook]--;
        this.booksIdInBasket.sum--;
        if(this.booksIdInBasket[idBook] < 1) {
          let tr = quantity.parentElement;
          tr.remove();
          delete this.booksIdInBasket[idBook];
          console.log(this.booksIdInBasket)
        }
        quantityAmount.innerText = this.booksIdInBasket[idBook];

        console.log(this.booksIdInBasket);
        localStorage.setItem("booksIdInBasket", JSON.stringify(this.booksIdInBasket));
      });
    }
  }

  
}
