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
});