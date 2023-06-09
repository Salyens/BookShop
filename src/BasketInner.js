export class BasketInner {
  constructor(books, basketElemRef) {
    this.books = books;
    this.basketElemRef = basketElemRef;
  }
  
  createBasketList(basketButton) {
    basketButton.addEventListener("click", () => {
      let booksIdInBasket = JSON.parse(
        localStorage.getItem("booksIdInBasket")
      ) || {
        sum: 0,
      };
      const contentContainer = document.querySelector("#container");
      contentContainer.innerHTML = "";
      let total = 0;
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

        quantityPlus.addEventListener("click", (event) => {
          booksIdInBasket = JSON.parse(
            localStorage.getItem("booksIdInBasket")
          ) || {
            sum: 0,
          };
          const idBook =
            event.target.parentElement.parentElement.parentElement.getAttribute(
              "id"
            );
          booksIdInBasket[idBook]++;
          booksIdInBasket.sum++;
          const quantity = booksIdInBasket[idBook];
          quantitySpan.innerText = quantity;
          createBooksList();
          createTotalPrice(total);
          this.basketElemRef.innerText = booksIdInBasket.sum;
          localStorage.setItem(
            "booksIdInBasket",
            JSON.stringify(booksIdInBasket)
          );
        });

        quantityMinus.addEventListener("click", (event) => {
          booksIdInBasket = JSON.parse(
            localStorage.getItem("booksIdInBasket")
          ) || {
            sum: 0,
          };
          const idBook =
            event.target.parentElement.parentElement.parentElement.getAttribute(
              "id"
            );
          booksIdInBasket[idBook]--;
          booksIdInBasket.sum--;
          const quantity = booksIdInBasket[idBook];
          quantitySpan.innerText = quantity;
          createBooksList();
          createTotalPrice(total);
          this.basketElemRef.innerText = booksIdInBasket.sum;
          if(!booksIdInBasket.sum) {
            booksIdInBasket.sum = 0;
            this.basketElemRef.style.cssText = 'display: none;';
          }
          localStorage.setItem(
            "booksIdInBasket",
            JSON.stringify(booksIdInBasket)
          );
        });
      };
      createTR("Id", "Product name", "Quantity", "Price", "Subtotal");

      const createBooksList = () => {
        table.innerHTML = "";
        createTR("Id", "Product name", "Quantity", "Price", "Subtotal");
        total = 0;
        for (const key in booksIdInBasket) {
          if (booksIdInBasket[key] < 1) {
            delete booksIdInBasket[key];
          }
          for (const el of this.books) {
            if (el.id === key && booksIdInBasket[key] > 0) {
              let thId = el.id;
              let thPrice = el.price;
              let thName = el.name;
              let thQuantity = booksIdInBasket[key];
              let thSubtotal = thPrice * thQuantity;
              total += thSubtotal;
              createTR(thId, thName, thQuantity, thPrice, thSubtotal);
            }
          }
        }
        return total;
      };

      if (booksIdInBasket.sum) createBooksList();

      function createTotalPrice(total) {
        const totalEl = document.querySelector("#total");
        if (totalEl) totalEl.remove();

        const totalDiv = document.createElement("div");
        totalDiv.setAttribute("id", "total");

        const totalPriceSpan = document.createElement("span");
        totalPriceSpan.innerText = `Total: ${total}$`;
        totalDiv.append(totalPriceSpan);

        contentContainer.append(totalDiv);
        contentContainer.style.cssText = "flex-direction: column;";
      }
      createTotalPrice(total);
    });
  }
}
