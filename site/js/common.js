head.ready(function() {
    if ( $('.js-slick').length ) {
        $('.js-slick').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
            // fade: true,
            mobileFirst: true
        });
    }

    if ( $('[data-more-btn]').length ) {
        $('[data-more-btn]').each(function(index, el) {
            var btn     = $(this),
                content = $('[data-more-content=' + btn.data('more-btn') + ']');

            btn.on('click', function(event) {
                event.preventDefault();
                btn.toggleClass('is-active');
                content.slideToggle();
            });
        });
    }
});