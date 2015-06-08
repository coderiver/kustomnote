head.ready(function() {

    var body            = $('body'),
        header          = $('header'),
        win             = $(window),
        featureMoreLink = $('.feature-more__link'),
        breakpoint      = 753,
        openedPopup,
        cardSlider;


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

    var showPopup = function(popup, cb) {
        if ( openedPopup ) {
            hidePopup(openedPopup);
        }
        // disableScroll();
        disableBodyScroll();
        popup.fadeIn(200);
        openedPopup = popup;

        if (typeof cb === 'function') {
            cb();
        }
    };

    var hidePopup = function(popup, cb) {
        popup.fadeOut(200);
        openedPopup = undefined;
        // enableScroll();
        enableBodyScroll();

        var form = popup.find('.form.is-error');
        if ( form.length ) {
            clearForm(form);
        }

        if (typeof cb === 'function') {
            cb();
        }
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


    var disableBodyScroll = function() {
        if ( !body.hasClass('no-scroll') ) {
            var pos = win.scrollTop();
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
            win.scrollTop(-pos);
            body.removeClass('no-scroll');
        }
    };

    var makeHeaderFixed = function() {
        var scroll     = win.scrollTop(),
            winWidth   = win.width(),
            fixedClass = 'is-fixed';
            minWinSize = breakpoint;

        if ( scroll > 0 && winWidth >= minWinSize ) {
            header.addClass(fixedClass);
        }

        win.on('scroll', function() {
            scroll = win.scrollTop();

            if ( scroll > 0 && winWidth >= minWinSize ) {
                header.addClass(fixedClass);
            }
            if ( scroll <= 0 && winWidth >= minWinSize ) {
                header.removeClass(fixedClass);
            }

        });

        win.on('resize', function() {
            winWidth   = win.width();

            if ( winWidth < minWinSize && header.hasClass(fixedClass) ) {
                header.removeClass(fixedClass);
            }

            if ( winWidth >= minWinSize && !header.hasClass(fixedClass) ) {
                header.addClass(fixedClass);
            }
        });
    };

    makeHeaderFixed();


    var validateEmail = function(email) {
        console.log(email);
        var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        if (re.test(email)) {
            return true;
        } else {
            return false;
        }
    };

    var checkFormInputs = function(form) {
        var input = form.find('input'),
            check = true,
            i     = 0;

        while ( check && i < input.length) {
            if ( $(input[i]).val() === '' ) {
                check = false;
            }
            i++;
        }
        return check;
    };

    var clearForm = function(form) {
        setTimeout(function() {
            form.find('input').val('');
            if ( form.hasClass('is-error') ) {
                form.removeClass('is-error');
            }
        }, 200);
    };

    var formSuccess = function(form) {
        if ( form.hasClass('is-error') ) {
            form.removeClass('is-error');
        }
        form.addClass('is-success');
    };

    var validateForm = function(form, success) {

        if ( checkFormInputs(form) ) {

            var email      = form.find('input[type="email"]');
            var emailValid = true;
            if ( email.length ) {
                emailValid = validateEmail(email.val());
            }

            if ( emailValid && !success ) {
                alert('Success. Need send request to server');
                hidePopup(openedPopup);
                clearForm(form);
                return true;

            } else if ( emailValid && success ) {
                alert('Success. Need send request to server');
                formSuccess(form);
                return true;

            } else {
                if ( !form.hasClass('is-error') ) {
                    form.addClass('is-error');
                }
                return false;
            }

        } else {
            if ( !form.hasClass('is-error') ) {
                form.addClass('is-error');
            }
            return false;
        }
    };


    $('#login .form').submit(function(event) {
        event.preventDefault();
        validateForm($(this));
    });

    $('#sign-up .form').submit(function(event) {
        event.preventDefault();
        validateForm($(this));
    });

    $('#reset-password .form').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        if ( validateForm(form, true) ) {
            var button   = form.find('button[type=submit]'),
                popup    = form.parents('.popup');
                closeBtn = popup.find('.popup__close');
                oldText  = button.text();

            button.text('Close');

            button.bind('resetForm', function() {
                setTimeout(function() {
                    button.text(oldText);
                    form.removeClass('is-success');
                    clearForm(form);
                    button.unbind('resetForm');
                    button.off('click', buttonClick);
                    popup.off('click', popupClick);
                    closeBtn.off('click', popupClick);
                }, 200);
            });

            var buttonClick = function(event) {
                event.preventDefault();
                hidePopup(openedPopup);
                button.trigger('resetForm');
            };

            var popupClick = function() {
                button.trigger('resetForm');
            };

            button.on('click', buttonClick);

            popup.on('click', popupClick);

            closeBtn.on('click', popupClick);
        }
    });


    if ( featureMoreLink.length ) {

        featureMoreLink.tooltipster({
            delay: 100,
            touchDevices: false,
            trigger: 'hover',
            maxWidth: 280,
            position: 'bottom-left',
            animation: 'fade',
            offsetX: 15,
            functionInit: function() {
                var content = $(this).siblings('.feature-more__content').text();
                return content;
            }
         });


        featureMoreLink.on('click', function(e) {
            e.preventDefault();
            if ( $(document).width() < breakpoint ) {
                var content = $(this).siblings('.feature-more__content');
                content.slideToggle(300);
            }
        });

        if ( win.width() < breakpoint ) {
            featureMoreLink.tooltipster('disable');
        }

        win.on('resize', function() {
            var winWidth = $(document).width();
            if ( winWidth < breakpoint ) {
                featureMoreLink.tooltipster('disable');
            }
            if ( winWidth >= breakpoint ) {
                $('.feature-more__content').removeAttr('style');
                featureMoreLink.tooltipster('enable');
            }
        });

    }





    function CardSlider(selectors) {
        this.active    = false;
        this.selectors = selectors; // object
        this.elements  = {};
        this.slick     = null;

        return this;
    }

    CardSlider.prototype.showMore = function(e) {
        var _ = this;
        e.preventDefault();
        var currentCard = _.slick.$slides[ _.slick.currentSlide ];
        $(currentCard).toggleClass('is-flipped');
    };

    CardSlider.prototype.initSlider = function() {
        var _ = this;

        _.elements.slider.slick({
            slide: _.selectors.slide,
            prevArrow: _.elements.prevBtn,
            nextArrow: _.elements.nextBtn,
            dots: true,
            fade: true,
            infinite: false,
        });

        _.slick = _.elements.slider.slick('getSlick');

        if ( _.slick.currentSlide === 0 ) {
            _.slick.$prevArrow.css('display', 'none');
        }

        _.elements.slider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var currentCard = slick.$slides[ currentSlide ];
            setTimeout(function() {
                $(currentCard).removeClass('is-flipped');
            }, 500);

            if ( nextSlide === 0 ) {
                slick.$prevArrow.css('display', 'none');
            } else {
                slick.$prevArrow.css('display', '');
            }

            if ( nextSlide === slick.slideCount - 1) {
                slick.$nextArrow.css('display', 'none');
            } else {
                slick.$nextArrow.css('display', '');
            }
        });

        _.active = true;
    };

    CardSlider.prototype.destroySlider = function() {
        var _ = this;

        _.slick.$slides.removeClass('is-flipped');
        _.slick.unslick();
        _.slick = null;
        _.active = false;
        setTimeout(function() {
            $(_.selectors.slide).removeAttr('style');
        }, 100);
    };

    CardSlider.prototype.init = function() {
        var _ = this,
            winWidth;

        _.elements.slider  = $(_.selectors.slider);
        _.elements.moreBtn = $(_.selectors.moreBtn);
        _.elements.prevBtn = $(_.selectors.prevBtn);
        _.elements.nextBtn = $(_.selectors.nextBtn);

        _.elements.moreBtn.on('click', _.showMore.bind(_));

        if ( win.width() < breakpoint ) _.initSlider();

        win.on('resize', function() {
            winWidth = win.width();

            if ( winWidth < breakpoint && !_.active ) {
                _.initSlider();
            }
            else if ( winWidth >= breakpoint && _.active ) {
                _.destroySlider();
            }
        });
    };


    if ( $('.feature-group__cards').length ) {

        cardSlider = new CardSlider({
            slider : '.feature-group__cards',
            slide  : '.feature-group__cards .card',
            moreBtn: '.cards-nav__more',
            prevBtn: '.cards-nav__prev',
            nextBtn: '.cards-nav__next',
        }).init();

    }

});