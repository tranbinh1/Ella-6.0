class RecentlyViewed extends HTMLElement {
	constructor() {
		super();

		this.popup = this;
        this.expireDay = this.popup.getAttribute('data-expire-day');
        this.limit = this.popup.getAttribute('data-product-to-show');
        this.icon = this.getElementsByClassName('recently-viewed-icon');
        this.tab = this.getElementsByClassName('recently-viewed-tab');
        this.noProduct = this.getElementsByClassName('no-products')[0];

        Shopify.Products.recordRecentlyViewed();

        var cookieValue = $.cookie('shopify_recently_viewed');

        if (!(cookieValue !== null && cookieValue !== undefined && cookieValue !== "")){
            this.noProduct.style.display = 'flex';
            this.popup.classList.add('is-show');
        } else {
            var recentlyViewed = $(this.popup);

            var limit = this.limit,
                expireDay = this.expireDay;

            Shopify.Products.showRecentlyViewed({ 
                howManyToShow: limit,
                wrapperId: 'recently-viewed-products-list', 
                templateId: 'recently-viewed-product-popup',
                onComplete: function() {
                    recentlyViewed.find('.no-products').remove();
                    recentlyViewed.addClass('is-show');

                    var recentlyGrid = recentlyViewed.find('.products-grid'),
                        productGrid = recentlyGrid.find('.item');

                    if (productGrid.length > 0){
                        if(recentlyGrid.is(':visible')) {
                            if (window.innerWidth < 767) {
                                if (productGrid.length > 2) {
                                    recentlyGrid.addClass('has-arrow');
                                }
                            } else{
                                if (productGrid.length > 3) {
                                    recentlyGrid.addClass('has-arrow');
                                }
                            }
                        }
                    }

                    if(!recentlyGrid.hasClass('slick-initialized')) {
                        if (productGrid.length > 2) {
                            recentlyGrid.slick({
                                infinite: false,
                                speed: 1000,
                                slidesToShow: 3,
                                dots: false,
                                arrows: true,
                                vertical: true,
                                slidesToScroll: 1,
                                adaptiveHeight: true,
                                nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><title>ic-arrow-right</title><path d="M15.111 12L8 4.889 8.889 4l8 8-8 8L8 19.111z"></path></svg></button>', 
                                prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><title>ic-arrow-left</title><path d="M8.778 12l7.111-7.111L15 4l-8 8 8 8 .889-.889z"></path></svg></button>',
                                responsive: [
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToScroll: 1,
                                            slidesToShow: 1
                                        }
                                    }
                                ]
                            });
                        } else if (productGrid.length > 1) {
                            recentlyGrid.slick({
                                infinite: false,
                                speed: 1000,
                                slidesToShow: 2,
                                dots: false,
                                arrows: true,
                                vertical: true,
                                slidesToScroll: 1,
                                adaptiveHeight: true,
                                nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><title>ic-arrow-right</title><path d="M15.111 12L8 4.889 8.889 4l8 8-8 8L8 19.111z"></path></svg></button>', 
                                prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><title>ic-arrow-left</title><path d="M8.778 12l7.111-7.111L15 4l-8 8 8 8 .889-.889z"></path></svg></button>',
                                responsive: [
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToScroll: 1,
                                            slidesToShow: 1
                                        }
                                    }
                                ]
                            });
                        }
                    
                        recentlyGrid.prepend('<div class="product-info"></div>');
                    }

                    recentlyGrid.on('mouseenter', '.item', (event) => {
                        event.preventDefault();

                        var $currTarget = $(event.currentTarget), 
                            current = recentlyGrid.find('.slick-active'),
                            index = current.index($currTarget),
                            content = $currTarget.find('.second-info').html(),
                            productInfo = $('.product-info', recentlyGrid),
                            marginTop = Math.abs(index) * productInfo.outerHeight();

                        productInfo
                            .html(content)
                            .css('margin-top', marginTop)
                            .show();
                    });

                    recentlyGrid.on('mouseenter', '.slick-arrow', (event) => {
                        $('.product-info', recentlyGrid).hide();
                    });

                    recentlyGrid.on('click', 'a[data-mobile-click]', (event) => {
                        if (window.innerWidth < 768) {
                           event.preventDefault();
                        }
                    });

                    if (window.location.pathname.indexOf('/products/') !== -1) {
                        $.cookie('shopify_recently_viewed', cookieValue, { expires: expireDay, path: "/", domain: window.location.hostname });
                    }
                }
            });

            recentlyViewed.on('click', '[data-open-newsletter-popup]', (event) => {
                event.preventDefault();
                
                document.body.classList.add('newsletter-show');
            });
        }
		
        for (i = 0; i < this.icon.length; i++) {
            this.icon[i].addEventListener('click', this.popup.iconClick.bind(this));
        }

        document.body.addEventListener('click', this.onBodyClickEvent.bind(this));
	}

    imageHover(event){

    }

    iconClick(event){
        var $currTarget = event.currentTarget,
            $recentlyViewed = this.popup;

        if($currTarget.classList.contains('open-popup')){
            var currPopup = $currTarget.getAttribute('data-target');

            if($currTarget.classList.contains('is-open')){
                $currTarget.classList.remove('is-open');
                document.getElementById(currPopup).classList.remove('is-visible');
            } else {
                this.closeTab();

                $currTarget.classList.add('is-open');
                document.getElementById(currPopup).classList.add('is-visible');
            }
        } else {
            this.closeTab();

            $('html, body').animate({
                scrollTop: 0
            }, 700);
        }
    }

    closeTab(){
        for (i = 0; i < this.icon.length; i++) {
            this.icon[i].classList.remove('is-open');
        }

        for (i = 0; i < this.tab.length; i++) {
            this.tab[i].classList.remove('is-visible');
        }
    }

    onBodyClickEvent(event){
        if (!this.contains(event.target)){
            this.closeTab();
        }
    }
}

customElements.define('recently-viewed-popup', RecentlyViewed);