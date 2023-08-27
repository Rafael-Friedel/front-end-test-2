const getProducts = async () => {
  const url = "http://localhost:3333/product";
  const product = await axios.get(url)
  .then(response => response.data)
  .catch(error => console.error('Erro ao fazer a solicitação GET:', error));
  return product;
}

const data = await getProducts();

const addSelected = (e) => {
  const brothers = e.target.closest('ul').children;
  Array.from(brothers).forEach((brother) => {
    if(brother.querySelector('a').classList.contains('selected')) {
      brother.querySelector('a').classList.remove('selected')
    }
  })
  e.target.closest('a').classList.add('selected');
}

const updateName = () => {
  if(data.name){
    const nameProduct = document.querySelector(".product__name").querySelector('a');
    nameProduct.innerText = data.name;
  }
}

const updatePrices = () => {
  if(data.price || data.selfPrice) {
    const pricesProduct = document.querySelector(".product__price");
    const priceBest = pricesProduct.querySelector(".price__best")
    const priceInstallment = pricesProduct.querySelector(".price__installment");
    priceBest.innerText = 'R$ ' + data.selfPrice.toFixed(2).replace(".", ",");
    priceInstallment.innerText = "Ou 5x de R$ " + (data.price / 5).toFixed(2).replace(".", ",");
  }
}

const updateDescription = () => {
  if(data.description){
    const descriptionProduct = document.querySelector(".product__description");
    descriptionProduct.innerHTML = data.description;
  }
}

const createCustomElement = (element, className, innerText, src) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if(src) {
    e.src = src
  }
  return e;
}

const createColorsProductElement = (listColors) => {
  const newList = document.createElement('ul');
  newList.className = 'flex gap-2';
  const mapColors = {
    Azul: "bg-blue-700",
    Preto: "bg-black",
  }
  listColors.map((color, index) => {
    newList
    .appendChild(createCustomElement('li', 'rounded-full border w-8 h-8 text-[0px]', ''))
    .appendChild(createCustomElement("a", `${mapColors[color]} block w-full h-full rounded-full p-1 ${index===0 ? 'selected' : ''} pointer`, color))
    .addEventListener('click', addSelected);
  })
  return newList;
}


const updateColors = () => {
  if(data.skus__fields.color) {
      const colorsProduct = document.querySelector(".sku__cor");
      const oldColors = colorsProduct.querySelector('ul');
      oldColors.remove();
      colorsProduct.appendChild(createColorsProductElement(data.skus__fields.color))
  }
}

const createSizesProductElemnt = (listSizes) => {
  const ul = document.createElement('ul');
  ul.className = 'flex gap-2';
  listSizes.map((size, index) => {
    ul
    .appendChild(createCustomElement('li', 'rounded-full border w-8 h-8 text-sm', ''))
    .appendChild(createCustomElement("a", `w-full h-full rounded-full p-1 flex justify-center items-center ${index===0 ? 'selected' : ''} pointer`, size))
    .addEventListener('click', addSelected);
  })
  return ul;
}

const updateSizes = () => {
  if(data.skus__fields.size) {
    const sizesProduct = document.querySelector(".sku__tamanho");
    const oldSizes = sizesProduct.querySelector("ul");
    oldSizes.remove();
    sizesProduct.appendChild(createSizesProductElemnt(data.skus__fields.size))
  }
}

const updatePage = () => {
  updateName();
  updatePrices();
  updateDescription();
  updateColors();
  updateSizes();
  getCartQtt();
  // updateImages();
}

// const updateImages = () => {
//   const containerImages = document.querySelector('.product__gallery__thumbs');
//   const oldImages = containerImages.querySelectorAll('.product__gallery__thumb');
//   oldImages.forEach((image, index) => {
//     image.querySelector('img').src = data.images[index].url;
//   })

// }

const verifyStock = () => {
  const size = document.querySelector('.sku__tamanho').querySelector('.selected').innerHTML
  const color = document.querySelector('.sku__cor').querySelector('.selected').innerHTML;
  const stock = data.skus.find((sku) => sku.size === size && sku.color === color).stock;
    console.log({ size, color, stock});

    if(stock > 0) {
      addToCart();
    } else createToast('fail');
}

const createToast = (className) => {
  const messages = {
    fail: "Produto sem estoque, favor escolher outra opção",
    success: "Produto adicionado ao carrinho com sucesso!",
  }
  const toast = createCustomElement('div', `toast-${className}`, messages[className]);
  document.querySelector('body').appendChild(toast);
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  localStorage.setItem('cart', JSON.stringify([...cart, data]));
  document.querySelector('.mark-qtty').innerText = cart.length + 1;
  createToast('success');
}

const getCartQtt = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const imgCart = document.querySelector('.header__cart');
  const span = createCustomElement('a', 'mark-qtty', cart.length);
  span.href = '/cart.html';
  imgCart.appendChild(span);
}

const buttonBuy = document.querySelector('.button__buy');
buttonBuy.addEventListener('click', verifyStock)
updatePage();
