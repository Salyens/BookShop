export class Helper {
  total = 0
  constructor(books) {
    this.books = books;
  }
  createCell(container, table, thORtd, id, name, quantity, price, subtotal) {
    const tr = document.createElement("tr");
    const idEl = document.createElement(thORtd);
    const nameEl = document.createElement(thORtd);
    const quantityEl = document.createElement(thORtd);
    const quantitySpan = document.createElement("span");
    const quantityPlus = document.createElement("span");
    const quantityMinus = document.createElement("span");
    const priceEl = document.createElement(thORtd);
    const subtotalEl = document.createElement(thORtd);

    idEl.innerText = id;
    nameEl.innerText = name;
    quantitySpan.innerText = quantity;
    priceEl.innerText = price;
    subtotalEl.innerText = subtotal;

    quantityEl.setAttribute("class", "quantity");
    quantityEl.append(quantitySpan);
    subtotalEl.setAttribute("class", "subtotal");

    if (thORtd === "td") {
      tr.setAttribute("id", id);
      quantitySpan.setAttribute("class", "quantity-amount");

      quantityMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';
      quantityMinus.setAttribute("class", "quantity-minus");

      quantityPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
      quantityPlus.setAttribute("class", "quantity-plus");

      quantityEl.append(quantityMinus);
      quantityEl.append(quantityPlus);
    }

    tr.append(idEl);
    tr.append(nameEl);
    tr.append(quantityEl);
    tr.append(priceEl);
    tr.append(subtotalEl);

    table.append(tr);
    container.append(table);

  }

  createTotalPrice(subtotals, container) {
    for (const el of subtotals) {
      if (Number(el.innerText)) this.total += +el.innerText;
    }

    const totalEl = document.querySelector("#total");
    if (totalEl) totalEl.remove();

    const totalDiv = document.createElement("div");
    totalDiv.setAttribute("id", "total");

    const totalPriceSpan = document.createElement("span");
    totalPriceSpan.innerText = `Total: ${this.total}$`;
    totalDiv.append(totalPriceSpan);

    container.append(totalDiv);
    container.style.cssText = "flex-direction: column;";
  };
}
