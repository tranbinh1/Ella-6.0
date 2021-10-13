(function ($) {
	var halo = {
	    initBrandsSlider: function() {
	        var brandsSlider = $('[data-brands-slider]');

	        brandsSlider.each(function () {
	            var self = $(this);

	            if (self.not('.slick-initialized')) {
	                self.slick({
	                    slidesToShow: self.data('rows'),
	                    slidesToScroll: 1,
	                    dots: false,
	                    infinite: false,
	                    speed: 800,
	                    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 7.75 1.34375 L 6.25 2.65625 L 14.65625 12 L 6.25 21.34375 L 7.75 22.65625 L 16.75 12.65625 L 17.34375 12 L 16.75 11.34375 Z"></path></svg></button>',
	              		prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 7.75 1.34375 L 6.25 2.65625 L 14.65625 12 L 6.25 21.34375 L 7.75 22.65625 L 16.75 12.65625 L 17.34375 12 L 16.75 11.34375 Z"></path></svg></button>',
	                    responsive: [{
	                            breakpoint: 1200,
	                            settings: {
	                                slidesToShow: 4,
	                                slidesToScroll: 4,
	                                get arrows() {
			                            if (window.layout_style == 'layout_style_suppermarket') {
			                                return this.arrows = false; 
			                            } else {
			                                return this.arrows = true; 
			                            }
			                        },
	                            }
	                        },
	                        {
	                            breakpoint: 992,
	                            settings: {
	                                slidesToShow: 3,
	                                slidesToScroll: 3,
	                                get arrows() {
			                            if (window.layout_style == 'layout_style_suppermarket') {
			                                return this.arrows = false; 
			                            } else {
			                                return this.arrows = true; 
			                            }
			                        },
	                            }
	                        },
	                        {
	                            breakpoint: 768,
	                            settings: {
	                                slidesToShow: 2,
	                                slidesToScroll: 2,
	                                get arrows() {
			                            if (window.layout_style == 'layout_style_suppermarket') {
			                                return this.arrows = false; 
			                            } else {
			                                return this.arrows = true; 
			                            }
			                        },
	                            }
	                        },
	                        {
	                            breakpoint: 480,
	                            settings: {
	                                get slidesToShow() {
	                                	if (window.layout_style == 'layout_style_suppermarket') {
			                                return this.slidesToShow = 2; 
			                            } else {
			                                return this.slidesToShow = 1; 
			                            }
	                                },
	                                get slidesToScroll() {
	                                	if (window.layout_style == 'layout_style_suppermarket') {
			                                return this.slidesToScroll = 2; 
			                            } else {
			                                return this.slidesToScroll = 1; 
			                            }
	                                },
	                                get arrows() {
			                            if (window.layout_style == 'layout_style_suppermarket') {
			                                return this.arrows = false; 
			                            } else {
			                                return this.arrows = true; 
			                            }
			                        },
	                            }
	                        }
	                    ]
	                });
	            }
	        });
	    }
	}
	halo.initBrandsSlider();
})(jQuery);
