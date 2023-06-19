import { BookElement } from "./BookElement.js";
import { Basket } from "./Basket.js";
import { Helper } from "./Helper.js";

class BookShop {
  booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
    sum: 0,
  };
  rootElement = document.querySelector("#container");
  apiBaseURL = "http://localhost:3000/books";
  limit = 5;
  helper = new Helper();

  constructor(buttons) {
    const { basket, addToBasket, home, basketCounter } = buttons;
    this.basket = document.querySelector(basket);
    this.addToBasket = document.querySelectorAll(addToBasket);
    this.home = document.querySelector(home);
    this.basketCounter = document.querySelector(basketCounter);
  }

  renderList(list){
    this.rootElement.innerHTML = "";
    for (const el of list) {
      const book = this.createBookElement(el);
      this.rootElement.append(book);
    }
    const numberAmount = Math.ceil(this.totalBooks/this.limit);
    this.helper.createPageNumbers(this.rootElement, numberAmount);
    const numbers = document.querySelectorAll('.number');
    for(const el of numbers) {
      el.addEventListener('click', async () => {
        const list = await this.getData({page: el.innerText})
        this.renderList(list);
      })
    }
  }

  createInitialHTML(data) {
    this.rootElement.innerHTML = "";
    this.rootElement.style.cssText = "flex-direction: row;";
    for (const el of data) {
      const book = this.createBookElement(el);
      this.rootElement.append(book);
    }
    const numberAmount = Math.ceil(this.totalBooks/this.limit)
    this.helper.createPageNumbers(this.rootElement, numberAmount)
    const numbers = document.querySelectorAll('.number');
    for(const el of numbers) {
      el.addEventListener('click', async () => {
        const list = await this.getData({page: el.innerText})
        this.renderList(list);
      })
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
    const tableHeaderCell = {
      id: "Id",
      name: "Product name",
      amount: "Quantity",
      price: "Price",
      subtotal: "Subtotal"
    }
    basket.createRow(tableHeaderCell, 'th');
    const booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket"));
    const bookIds = Object.keys(booksIdInBasket);
    const filteredBooks = books.filter((book) => bookIds.includes(book.id));
     filteredBooks.forEach((book) => {
      const amount = booksIdInBasket[book.id];
      book["amount"] = amount;

      basket.createRow(book, 'td');

    });
    basket.createTotal();
    basket.createPlusAndMinus(this.basketCounter);
  }

  async getData(paramObj) {
    let request = [];
    if(paramObj && Object.keys(paramObj).length) {
      if(paramObj.page) {
        request.push(`_page=${paramObj.page}`)
      }
      if(paramObj.limit) {
        request.push(`_limit=${paramObj.limit}`)
      }
      else request.push(`_limit=${this.limit}`)
    }
    request = request.join("&");
    const result = await fetch(`${this.apiBaseURL}?${request}`);
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
    const allBooks = await this.getData();
    this.totalBooks = allBooks.length;
    const books = await this.getData({page: 1});
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
