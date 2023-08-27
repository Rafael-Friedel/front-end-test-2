const createCustomElement = (element, className, innerText, src) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if(src) {
    e.src = src
  }
  return e;
}

const getCartQtt = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const imgCart = document.querySelector('.header__cart');
  const span = createCustomElement('span', 'mark-qtty', cart.length);
  imgCart.appendChild(span);
}

getCartQtt();