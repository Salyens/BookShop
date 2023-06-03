class BookShop {
  counterItemsInBasket = localStorage.getItem("counterItemsInBasket") || 0;
  rootElement = document.querySelector('#container');
  apiBaseURL = 'http://localhost:3000/books';
  constructor(buttons) {
    const { basket, addToBasket, home, basketCounter } = buttons;
    this.basket = document.querySelector(basket);
    this.addToBasket = document.querySelectorAll(addToBasket);
    this.home = document.querySelector(home);
    this.basketCounter = document.querySelector(basketCounter);
  }

  createInitialHTML(data) {
    this.rootElement.innerHTML = '';
    for(const el of data) {
      const book = this.createBookElement(el);
      this.rootElement.append(book);
    }
  }

  createBookElement(book) {
    const {id, name, price, description, imgURL} = book;

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'book-wrapper');

    const bookImg = document.createElement('div');
    bookImg.setAttribute('class', 'book-img');
    const img = document.createElement('img');
    img.setAttribute('class', 'img');
    img.src = imgURL;
    bookImg.append(img);

    const bookPrice = document.createElement('div');
    bookPrice.setAttribute('class', 'book-price');
    const spanPrice = document.createElement('span');
    spanPrice.setAttribute('class', 'price');
    spanPrice.innerText = price;
    bookPrice.append(spanPrice);

    const bookDescription = document.createElement('div');
    bookDescription.setAttribute('class', 'book-description');
    const pDescription = document.createElement('p');
    pDescription.innerText = description;
    bookDescription.append(pDescription);

    const bookButton = document.createElement('button');
    bookButton.setAttribute('class', 'book-btn');
    const spanButton = document.createElement('span');
    spanButton.innerText = 'Добавить в корзину';
    bookButton.append(spanButton);

    wrapper.append(bookImg);
    wrapper.append(bookPrice);
    wrapper.append(bookDescription);
    wrapper.append(bookButton);

    return wrapper;
  }

  async getData() {
    const result = await fetch(this.apiBaseURL);
    let json;
    if(result.ok) {
      json = await result.json();
    }
    return json;
  }



  showBasket() {
    const container = document.querySelector("#container");
    const basketContainer = document.querySelector("#container-basket");

    this.basket.addEventListener("click", function () {
      container.style.cssText = "display: none;";
      basketContainer.style.cssText = "display: flex;";
    });
  }

  backToHomePage() {
    const container = document.querySelector("#container");
    const basketContainer = document.querySelector("#container-basket");

    this.home.addEventListener("click", function () {
      container.style.cssText = "display: flex;";
      basketContainer.style.cssText = "display: none;";
    });
  }

  addItemToBasket() {
    for (const el of this.addToBasket) {
      el.addEventListener("click", (event) => {

      });
    }
  }

  displayCounterItem() {
    if (this.counterItemsInBasket != 0) {
      this.basketCounter.innerText = this.counterItemsInBasket;
      this.basketCounter.style.cssText = "display: flex;";
    }
  }

  async start() {
    const books = await this.getData();
    this.createInitialHTML(books);
    console.log(books);
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
