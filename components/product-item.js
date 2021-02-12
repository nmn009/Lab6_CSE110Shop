// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })

    this.li = document.createElement('li');
    this.li.setAttribute('class', 'product');

    this.img = this.li.appendChild(document.createElement('img'));

    this._title = this.li.appendChild(document.createElement('p'));
    this._title.setAttribute('class', 'title');

    this.price = this.li.appendChild(document.createElement('p'));
    this.price.setAttribute('class', 'price');

    this.button = this.li.appendChild(document.createElement('button'));
    this.button.setAttribute('onclick', `alert('Added to Cart!')`)

    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('href', './styles/styles.css')

    this.shadowRoot.append(this.li, styleLink);
  }

  static get observedAttributes() {
    return ['product', 'in-cart'];
  }

  attributeChangedCallback(name, prev, val) {
    if (name === 'product') {
      this.product = JSON.parse(val);
      this.img.setAttribute('src', this.product.image);
      this.img.setAttribute('alt', this.product.title);

      this._title.innerText = this.product.title;

      this.price.innerText = '$' + this.product.price.toFixed(2);
    } else if (name === 'in-cart') {
      const inCart = val === 'true';

      this.button.innerText = !inCart ? 'Add to Cart' : 'Remove from Cart';
      this.button.setAttribute('onclick', !inCart ? `addToCart(${this.product.id})` : `removeFromCart(${this.product.id})`);
    }
  }
}

customElements.define('product-item', ProductItem);
