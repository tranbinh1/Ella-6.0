class QuickSearch extends HTMLElement {
    constructor() {
        super();

        this.quickSearch = this;
        this.productToShow = this.getAttribute('data-product-to-show');
        this.headerInput = document.querySelector('input[name="q"]');
        this.searchResults = this.getElementsByClassName('quickSearchResultsContent')[0];
        this.searchResultsWidget = this.getElementsByClassName('quickSearchResultsWidget')[0];
        this.detailsContainer = this.closest('details');

        this.debouncedOnFocus = debounce((event) => {
            this.doQuickSearch();
        }, 200);

        this.headerInput.addEventListener('input', this.debouncedOnFocus.bind(this));

        this.headerInput.addEventListener('focus', (event) => {
          event.target.closest('details').setAttribute('open', true);
          if (window.innerWidth > 1025) {
            document.querySelector('body').classList.add('open_search');
          }
        });

        document.body.addEventListener('click', (event) => {
            if(document.body.classList.contains('open_search')){
                if ((!this.contains(event.target)) && !this.getElementsByClassName('header').classList.contains('header-02') && ($(event.target).closest('.header__search').length === 0)){
                    this.detailsContainer.removeAttribute('open');
                    if (window.innerWidth > 1025) {
                        document.querySelector('body').classList.add('open_search');
                    }
                }
            }
        });
    }


    doQuickSearch(){
        if (this.headerInput.value.trim() === '') {
            this.searchResults.classList.remove('is-show');
            this.searchResults.classList.add('is-hidden');
            this.searchResultsWidget.classList.remove('is-hidden');
            this.searchResultsWidget.classList.add('is-show');
            return; 
        } else {
            if (this.headerInput.value.length >= 1){
                this.quickSearch.classList.add('is-loading');

                var keyword = this.headerInput.value;
                var limit = this.productToShow;

                var url = `/search?view=ajax_quick_search&q=${keyword}*&type=product`;

                this.renderQuickSearchFromFetch(url, keyword, limit);
            }
        }
    }
   
    renderQuickSearchFromFetch(url, keyword, limit){
        fetch(url)
            .then(response => response.json())
            .then((responseText) => {
                const products = responseText.results;

                var count = responseText.results_count;

                if(products.length > 0){
                    this.searchResults.getElementsByClassName('productEmpty')[0].style.display = 'none';

                    var list = []; 

                    products.forEach(product => {
                        list.push(product.handle);
                    });

                    var  quickSearch = this.quickSearch,
                        searchResults = this.searchResults,
                        searchResultsWidget = this.searchResultsWidget;

                    $.ajax({
                        type: 'get',
                        url: window.routes.collection_all,
                        cache: false,
                        data: {
                            view: 'ajax_product_card',
                            constraint: `limit=${limit}+sectionId=list-result+list_handle=` + encodeURIComponent(list)
                        },
                        beforeSend: function () {},
                        success: function (data) {
                            var searchQuery = `/search?q=${keyword}*&type=product`;

                            searchResults.getElementsByClassName('productGrid')[0].innerHTML = data;
                            searchResults.getElementsByClassName('productViewAll')[0].style.display = 'block';
                            searchResults.getElementsByClassName('button-view-all')[0].setAttribute('href', searchQuery);
                            searchResults.getElementsByClassName('button-view-all')[0].innerText = count;
                        },
                        complete: function () {
                            quickSearch.classList.remove('is-loading');
                            searchResultsWidget.classList.remove('is-show');
                            searchResultsWidget.classList.add('is-hidden');
                            searchResults.classList.remove('is-hidden');
                            searchResults.classList.add('is-show');
                            if ((window.show_multiple_currencies && Currency.currentCurrency != shopCurrency) || window.show_auto_currency) {
                                Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                            };
                        }
                    });
                } else {
                    this.searchResults.getElementsByClassName('productGrid')[0].innerHTML = '';
                    this.searchResults.getElementsByClassName('productViewAll')[0].style.display = 'none';
                    this.searchResults.getElementsByClassName('productEmpty')[0].style.display = 'block';
                    this.searchResults.getElementsByClassName('keyword')[0].innerHTML = `<strong>${keyword}</strong>`;
                    this.quickSearch.classList.remove('is-loading');
                    this.searchResultsWidget.classList.remove('is-show');
                    this.searchResultsWidget.classList.add('is-hidden');
                    this.searchResults.classList.remove('is-hidden');
                    this.searchResults.classList.add('is-show');
                }
            });
    }
}

customElements.define('quick-search', QuickSearch);