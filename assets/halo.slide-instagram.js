(function ($) {
	var halo = {
	    initInstagramSlider: function() {
	        var instagramBlock = $('[data-instagram-feed]');

	        instagramBlock.each(function() {
	            var self = $(this),
	                dataRows = self.data('rows'),
	                dataSlideRow = self.data('slide-rows'),
	                dataArrow = self.data('arrow'),
	                dataMode = self.data('mode'),
	                dataLimit = self.data('limit');
	                
	            if (dataSlideRow == 2) {
            		var x =  self.children();
		            for (i = 0; i < x.length ; i += 2) {
		              x.slice(i,i+2).wrapAll('<div class="'+ i +'"></div>');
		            }
	            }

	            self.slick({
	              	infinite: false,
	              	speed: 1000, 
	              	centerMode: dataMode,
					get centerPadding() {
					    if (dataMode == true) {
					        return this.centerPadding = '11.36%';
					    }
					},
	              	arrows: dataArrow,
	              	nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 7.75 1.34375 L 6.25 2.65625 L 14.65625 12 L 6.25 21.34375 L 7.75 22.65625 L 16.75 12.65625 L 17.34375 12 L 16.75 11.34375 Z"></path></svg></button>',
	              	prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 7.75 1.34375 L 6.25 2.65625 L 14.65625 12 L 6.25 21.34375 L 7.75 22.65625 L 16.75 12.65625 L 17.34375 12 L 16.75 11.34375 Z"></path></svg></button>',
	              	slidesToShow: dataRows,
	              	slidesToScroll: dataRows,
	              	responsive: [
	                {
	                  	breakpoint: 1200,
	                  	settings: {
							get slidesPerRow() {
							    if (dataSlideRow == 2) {
									this.slidesPerRow = 1,
									this.rows = 2
							    }
							},
							get slidesToScroll() {
							    if (dataSlideRow == 1) {
									return this.slidesToScroll = 4
							    }
							},
							slidesToShow: 4
	                  	}
	                },
	                {
	                  	breakpoint: 992,
	                  	settings: {
							get slidesPerRow() {
							    if (dataSlideRow == 2) {
									this.slidesPerRow = 1,
									this.rows = 2
							    }
							},
							get slidesToScroll() {
							    if (dataSlideRow == 1) {
									return this.slidesToScroll = 3
							    }
							},
							slidesToShow: 3
		                }
	                },
	                {
	                  	breakpoint: 768,
	                  	settings: {
		                  	get slidesPerRow() {
							    if (dataSlideRow == 2) {
									this.slidesPerRow = 1,
									this.rows = 2
							    }
							},
							get slidesToScroll() {
							    if (dataSlideRow == 1) {
									return this.slidesToScroll = 1
							    }
							},
							slidesToShow: 2
	                  	}
	                }                                          
	              ]
	            });
	        });
	    }
	}
	halo.initInstagramSlider();
})(jQuery);