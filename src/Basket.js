export class Basket {
    booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
        sum: 0
    }
    constructor(books, abc) {
        this.books = books;
        this.f = abc;
    }

    createTR() {

    }

    createListHTML() {
        const table = document.createElement("table");

      const createTR = (thId, thName, thQuantity, thPrice, thSubtotal) => {
        const tr = document.createElement("tr");
        const thIdEl = document.createElement("th");
        const thNameEl = document.createElement("th");
        const thQuantityEl = document.createElement("th");
        const quantitySpan = document.createElement("span");
        const quantityPlus = document.createElement("span");
        const quantityMinus = document.createElement("span");
        const thPriceEl = document.createElement("th");
        const thSubtotalEl = document.createElement("th");
        
        thIdEl.innerText = thId;
        thNameEl.innerText = thName;
        quantitySpan.innerText = thQuantity;
        thQuantityEl.setAttribute("class", "quantity");
        thQuantityEl.append(quantitySpan);

        if (thId !== "Id") tr.setAttribute("id", thId);
        if (thQuantity !== "Quantity") {
          quantityMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';
          quantityPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';

          quantityPlus.setAttribute("class", "quantity-plus");
          quantityMinus.setAttribute("class", "quantity-minus");

          thQuantityEl.append(quantityMinus);
          thQuantityEl.append(quantityPlus);
        }

        thPriceEl.innerText = thPrice;
        thSubtotalEl.setAttribute("class", "subtotal");
        thSubtotalEl.innerText = thSubtotal;

        tr.append(thIdEl);
        tr.append(thNameEl);
        tr.append(thQuantityEl);
        tr.append(thPriceEl);
        tr.append(thSubtotalEl);

        table.append(tr);
        contentContainer.append(table);
    }
    }
}