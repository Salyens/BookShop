export class BookElement {
  constructor(book) {
    const { id, name, price, description, imgURL } = book;

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "book-wrapper");
    wrapper.setAttribute("data-id", id);

    const bookImg = document.createElement("div");
    bookImg.setAttribute("class", "book-img");
    const img = document.createElement("img");
    img.setAttribute("class", "img");
    img.src = imgURL;
    bookImg.append(img);

    const bookPrice = document.createElement("div");
    bookPrice.setAttribute("class", "book-price");
    const spanPrice = document.createElement("span");
    spanPrice.setAttribute("class", "price");
    spanPrice.innerText = price;
    bookPrice.append(spanPrice);

    const bookName = document.createElement("p");
    bookName.innerText = name;

    const bookDescription = document.createElement("div");
    bookDescription.setAttribute("class", "book-description");
    const pDescription = document.createElement("p");
    pDescription.innerText = description;
    bookDescription.append(pDescription);

    const bookButton = document.createElement("button");
    bookButton.setAttribute("class", "book-btn");
    const spanButton = document.createElement("span");
    spanButton.innerText = "Add to Basket";
    bookButton.append(spanButton);

    wrapper.append(bookImg);
    wrapper.append(bookPrice);
    wrapper.append(bookName);
    wrapper.append(bookDescription);
    wrapper.append(bookButton);

    this._book = wrapper;
    this._bookImg = bookImg;
    this._bookPrice = bookPrice;
    this._bookName = bookName;
    this._bookDescription = bookDescription;
    this._bookButton = bookButton;
  }

  get getBookButton() {
    return this._bookButton;
  }

  get getBook() {
    return this._book;
  }

  addItemToBasket (basketElemRef) {
    this.getBookButton.addEventListener('click', () => {
      const idWrapper = this._book.getAttribute('data-id');
      const booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {sum: 0};
      if(booksIdInBasket[idWrapper]) booksIdInBasket[idWrapper]++;
      else booksIdInBasket[idWrapper] = 1;
      booksIdInBasket.sum++;
      localStorage.setItem('booksIdInBasket', JSON.stringify(booksIdInBasket))
      basketElemRef.innerText = booksIdInBasket.sum;
      basketElemRef.style.cssText = 'display: flex;';
    })
  }
}
