head.ready(function() {

    var body = $('body');
    var openedPopup;

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

    var showPopup = function(popup) {
        if ( openedPopup ) {
            openedPopup.fadeOut(200);
        }
        // disableScroll();
        disableBodyScroll();
        popup.fadeIn(200);
        openedPopup = popup;
    };

    var hidePopup = function(popup) {
        popup.fadeOut(200);
        openedPopup = undefined;
        // enableScroll();
        enableBodyScroll();
    };

    $('[data-popup]').each(function() {
        var el = $(this);
        el.on('click', function(event) {
            event.preventDefault();
            var popup = $('#' + el.data('popup'));
            showPopup(popup);
        });
    });

    $('.popup__close').on('click touchend', function() {
        var popup = $(this).parents('.popup');
        hidePopup(popup);
    });

    $('.popup').on('click', function(event) {
        event.preventDefault();
        hidePopup($(this));
    });

    $('.popup__inner').on('click', function(event) {
        event.stopPropagation();
    });

    // disable scroll
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    // var keys = [37, 38, 39, 40];

    // function preventDefault(e) {
    //   e = e || window.event;
    //   if ( e.preventDefault )
    //       e.preventDefault();
    //   e.returnValue = false;
    // }

    // function keydown(e) {
    //     for (var i = keys.length; i--;) {
    //         if (e.keyCode === keys[i]) {
    //             preventDefault(e);
    //             return;
    //         }
    //     }
    // }

    // function wheel(e) {
    //   preventDefault(e);
    // }

    // function disableScroll() {
    //   if (window.addEventListener) {
    //       window.addEventListener('DOMMouseScroll', wheel, false);
    //   }
    //   window.onmousewheel = document.onmousewheel = window.ontouchmove = document.ontouchmove = wheel;
    //   // document.onkeydown = keydown;
    // }

    // function enableScroll() {
    //     if (window.removeEventListener) {
    //         window.removeEventListener('DOMMouseScroll', wheel, false);
    //     }
    //     window.onmousewheel = document.onmousewheel = window.ontouchmove = document.ontouchmove = document.onkeydown = null;
    // }

    var disableBodyScroll = function() {
        if ( !body.hasClass('no-scroll') ) {
            var pos = $(window).scrollTop();
            body.addClass('no-scroll');
            body.css({
                position : 'fixed',
                top      : -pos
            });
        }
    };

    var enableBodyScroll = function() {
        if ( body.hasClass('no-scroll') ) {
            var pos = body.offset().top;
            body.css({
                position : '',
                top      : ''
            });
            $(window).scrollTop(-pos);
            body.removeClass('no-scroll');
        }
    };

});