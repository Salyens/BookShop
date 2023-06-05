import { BookElement } from "./BookElement.js";
class BookShop {
  booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
    sum: 0,
  };
  rootElement = document.querySelector("#container");
  apiBaseURL = "http://localhost:3000/books";
  constructor(buttons) {
    const { basket, addToBasket, home, basketCounter } = buttons;
    this.basket = document.querySelector(basket);
    this.addToBasket = document.querySelectorAll(addToBasket);
    this.home = document.querySelector(home);
    this.basketCounter = document.querySelector(basketCounter);
  }

  createInitialHTML(data) {
    this.rootElement.innerHTML = "";
    for (const el of data) {
      const book = this.createBookElement(el);
      this.rootElement.append(book);
    }
  }

  createBookElement(book) {
    const bookElement = new BookElement(book);
    bookElement.addItemToBasket(this.basketCounter);
    return bookElement.getBook;
  }

  async getData() {
    const result = await fetch(this.apiBaseURL);
    let json;
    if (result.ok) {
      json = await result.json();
    }
    return json;
  }

  displayItemsInBasket() {
    this.basketCounter.innerText = this.booksIdInBasket.sum;
    this.basketCounter.style.cssText = "display: flex;";
  }

  async start() {
    if (this.booksIdInBasket.sum) this.displayItemsInBasket();
    const books = await this.getData();
    this.createInitialHTML(books);
  }
}

const buttons = {
  basket: "#img-basket",
  addToBasket: ".book-btn",
  home: "#home",
  basketCounter: "#basket-counter",
};

const bookShop = new BookShop(buttons);
bookShop.start();
