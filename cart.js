const createCustomElement = (element, className, innerText, src) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if(src) {
    e.src = src
  }
  return e;
}

const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

const getCartQtt = () => {
  const cart = getCart();
  const imgCart = document.querySelector('.header__cart');
  const span = createCustomElement('span', 'mark-qtty', cart.length);
  imgCart.appendChild(span);
}

getCartQtt();

const formatPrice = (price) => price.toFixed(2).replace(".", ",");

const createToast = (className) => {
  const messages = {
    success: "Produto sendo removido do seu carrinho",
  }
  const toast = createCustomElement('div', `toast-${className}`, messages[className]);
  document.querySelector('body').appendChild(toast);
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

const removeItemCart = (id) => {
  const cart = getCart();
  const newCart = cart.filter((itemCart) => itemCart.id !== id);
  localStorage.setItem('cart', JSON.stringify(newCart));
  createToast("success");
  setTimeout(() => {
    location.reload();
  }, 2000);
}
const createCardItem = (product) => {
  const { images, size, id, name, selfPrice, price, color } = product;
  const itemCard = createCustomElement("div", "card-item", '');
  const containerImage = createCustomElement("div", "image-container", '');
  itemCard.appendChild(containerImage);
  const imageProduct = createCustomElement("img", "image", '', window.location.origin + images[0].url)
  imageProduct.addEventListener("mouseover", () => {
    imageProduct.src = window.location.origin + images[1].url;
  })
  imageProduct.addEventListener("mouseleave", () => {
    imageProduct.src = window.location.origin + images[0].url;
  })
  containerImage.appendChild(imageProduct);
  const listAttributes = createCustomElement("div", "list-options", '');
  containerImage.appendChild(listAttributes);
  const sizeProduct = createCustomElement("p", "size-item", size);
  const mapColors = {
    Azul: "bg-blue-700",
    Preto: "bg-black",
  }
  const colorProduct = createCustomElement("p", `color-item ${mapColors[color]}`, '')
  listAttributes.appendChild(sizeProduct);
  listAttributes.appendChild(colorProduct);
  const containerButton = createCustomElement("div", "list-options", '');
  containerImage.appendChild(containerButton);
  const button = createCustomElement("button", "btt", "Remover da mochila");
  button.addEventListener("click" ,() => removeItemCart(id))
  containerButton.appendChild(button);
  const containerDescription = createCustomElement("div", "description-item", '');
  itemCard.appendChild(containerDescription);
  const nameProduct = createCustomElement("p", "name-item", name);
  const listPrice = createCustomElement("div", "list-price", '');
  const oldPrice = createCustomElement("p", "old-price-item", `R$ ${formatPrice(price)}`);
  const bestPrice = createCustomElement("p", "price-item", `R$ ${formatPrice(selfPrice)}`);
  listPrice.appendChild(oldPrice);
  listPrice.appendChild(bestPrice);
  containerDescription.appendChild(nameProduct);
  containerDescription.appendChild(listPrice);
  return itemCard;
}

const updateListCart = () => {
  const cart = getCart();
  const cartList = document.querySelector(".list-card");
  cart.map((itemCart) => {
    cartList.appendChild(createCardItem(itemCart))
  });
}

updateListCart();

const renderButtons = () => {
  const buttonSubmit = document.querySelector("#finish");
  const buttonNavHome = document.querySelector("#nav-home");
  getCart().length > 0 ? buttonNavHome.className = "no-showing" : buttonSubmit.className = "no-showing"
}

renderButtons();