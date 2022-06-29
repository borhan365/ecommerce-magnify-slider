class Zoom {
  constructor(element) {
    this.element = element;

    this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.addElements();
    this.setElements();
    this.setData();
    this.setEvents();
  }

  addElements() {
    this.element.innerHTML += '<span class="zoom__image-over js-zoom__image-over"><span class="zoom__image-over-inner js-zoom__image-over-inner"></span></span>';
  }

  setElements() {
    this.inner = this.element.querySelector('.js-zoom__inner');
    this.image = this.element.querySelector('.js-zoom__image');
    this.imageOver = this.element.querySelector('.js-zoom__image-over');
    this.imageOverInner = this.element.querySelector('.js-zoom__image-over-inner');
  }

  setData() {
    this.data = {
      imageZoom: this.image.getAttribute('data-zoom') || this.image.getAttribute('src')
    }
  }

  setEvents() {
    const zoomedClass = 'zoom--zoomed';

    this.image.addEventListener('mousemove', event => {
      const scale = this.imageOver.offsetWidth / this.image.offsetWidth;

      this.imageOverInner.setAttribute('style', 'background-image: url(' + this.data.imageZoom + ');');

      this.imageOver.scrollTop = event.y * scale;
      this.imageOver.scrollLeft = event.x * scale;

      this.inner.scrollTop = event.y;
      this.inner.scrollLeft = event.x;
    });

    this.element.addEventListener('click', event => {
      if (this.element.classList.contains(zoomedClass)) {
        this.element.classList.remove(zoomedClass);

        this.inner.scrollTop = 0;
        this.inner.scrollLeft = 0;
      } else {
        this.element.classList.add(zoomedClass);

        this.inner.scrollTop = event.y;
        this.inner.scrollLeft = event.x;
      }

      if (this.data.imageZoom && this.image.getAttribute('src') !== this.data.imageZoom) {
        this.image.setAttribute('src', this.data.imageZoom);
      }
    });
  }
};
  
const zoom = new Zoom(document.querySelector('.js-zoom'));
