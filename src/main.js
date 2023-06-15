import { BookElement } from "./BookElement.js";
import { Basket } from "./Basket.js";
import { Helper } from "./Helper.js";
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
    this.rootElement.style.cssText = "flex-direction: row;";
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

  getBasketItems(books) {
    const basket = new Basket(this.rootElement);
    this.rootElement.innerHTML = "";
    basket.createHeader();
    const booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket"));
    const bookIds = Object.keys(booksIdInBasket);
    const filteredBooks = books.filter((book) => bookIds.includes(book.id));
    const booksListInBasket = filteredBooks.map((book) => {
      const amount = booksIdInBasket[book.id];
      book["amount"] = amount;
      basket.createRow(book);
      return book;
    });
    basket.createTotal();
    basket.createPlusAndMinus(this.basketCounter);
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
    this.home.addEventListener("click", () => this.createInitialHTML(books));
    this.basket.addEventListener("click", () => this.getBasketItems(books));
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
