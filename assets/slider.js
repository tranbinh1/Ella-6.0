class SliderComponent extends HTMLElement {
    constructor() {
        super();
        this.slider = this.querySelector('ul');
        this.sliderItems = this.querySelectorAll('li');
        this.pageCount = this.querySelector('.slider-counter--current');
        this.pageTotal = this.querySelector('.slider-counter--total');
        this.prevButton = this.querySelector('button[name="previous"]');
        this.nextButton = this.querySelector('button[name="next"]');
        this.dotButton = this.querySelectorAll('button[name="dots"]');
        

        if (!this.slider || !this.nextButton) return;

        const resizeObserver = new ResizeObserver(entries => this.initPages());
        resizeObserver.observe(this.slider);

        this.slider.addEventListener('scroll', this.update.bind(this));
        this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
        this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
        this.dotButton.forEach((button) => {
            button.addEventListener('click', this.onDotClick.bind(this));
        });
    }

    initPages() {
        if (!this.sliderItems.length === 0) return;
        this.slidesPerPage = Math.floor(this.slider.clientWidth / this.sliderItems[0].clientWidth);
        this.totalPages = this.sliderItems.length - this.slidesPerPage + 1;
        this.update();
    }

    update() {
        this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItems[0].clientWidth);
        this.querySelector('.dots-item.active').classList.remove('active');
        this.querySelectorAll('.dots-item')[this.currentPage].classList.add('active');
    }

    onButtonClick(event) {
        event.preventDefault();
        const slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + this.sliderItems[0].clientWidth : this.slider.scrollLeft - this.sliderItems[0].clientWidth;
        console.log(slideScrollPosition, this.slider.scrollLeft);
        this.slider.scrollTo({
            left: slideScrollPosition
        });
    }

    onDotClick(event) {
        event.preventDefault();
        this.dotActive = this.querySelector('.dots-item.active button');
        const sliderItemActive = this.dotActive.dataset.index;
        const sliderItem = event.currentTarget.dataset.index;
        const sliderCount = sliderItem > sliderItemActive ? sliderItem - sliderItemActive : sliderItemActive - sliderItem;
        this.querySelector('.dots-item.active').classList.remove('active');
        event.currentTarget.closest('.dots-item').classList.add('active');
        
        const slideScrollPosition = sliderItem * this.sliderItems[0].clientWidth;

        console.log(slideScrollPosition);
        this.slider.scrollTo({
            left: slideScrollPosition
        });
    }
}

customElements.define('slider-component', SliderComponent);

class ProductSliderComponent extends SliderComponent {
    constructor() {
        super();
        this.slider = this.querySelector('.slider');
        this.sliderItems = this.querySelectorAll('.slider__slide');

        if (!this.slider || !this.nextButton) return;

        const resizeObserver = new ResizeObserver(entries => this.initPages());
        resizeObserver.observe(this.slider);

        this.slider.addEventListener('DOMSubtreeModified', () => {
            this.slider = this.querySelector('.slider');
            this.sliderItems = this.querySelectorAll('.slider__slide');
            this.slider.addEventListener('scroll', this.update.bind(this));
            this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
            this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
            this.dotButton.forEach((button) => {
                button.addEventListener('click', this.onDotClick.bind(this));
            });
        });

        this.slider.addEventListener('scroll', this.update.bind(this));
        this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
        this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
        this.dotButton.forEach((button) => {
            button.addEventListener('click', this.onDotClick.bind(this));
        });
    }
}

customElements.define('product-slider-component', ProductSliderComponent);

class BannerSliderComponent extends SliderComponent {
    constructor() {
        super();
        this.slider = this.querySelector('.slider');
        this.sliderItems = this.querySelectorAll('.slider__slide');

        if (!this.slider || !this.dotButton) return;

        const resizeObserver = new ResizeObserver(entries => this.initPages());
        resizeObserver.observe(this.slider);

        this.slider.addEventListener('DOMSubtreeModified', () => {
            this.slider = this.querySelector('.slider');
            this.sliderItems = this.querySelectorAll('.slider__slide');
            this.slider.addEventListener('scroll', this.update.bind(this));
            this.dotButton.forEach((button) => {
                button.addEventListener('click', this.onDotClick.bind(this));
            });
        });

        this.slider.addEventListener('scroll', this.update.bind(this));
        this.dotButton.forEach((button) => {
            button.addEventListener('click', this.onDotClick.bind(this));
        });
    }
}

customElements.define('banner-slider-component', BannerSliderComponent);

