(function ($) {
    'use strict';

    /*----------------*/
    /*  SLICK NAV
    /*---------------*/
    $('.header-menu').slicknav({
      prependTo: '.wpb-mobile-menu',
	  closeOnClick: true,
      label:""

    });
	/*----------------*/
    /*  CHECK THE INITIAL POISTION OF THE STICKY HEADER
    /*---------------*/
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 1){  
			$('#sticky_anchor').addClass("sticky");
		  }
		  else{
			$('#sticky_anchor').removeClass("sticky");
		  }
	});
	/*----------------------------------------------------*/
    /*  ACTIVE CLASS TO CURRENT MENU FOR ONLY HTML
    /*---------------------------------------------------*/
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    var $hash = window.location.hash.substring(1);

    if ($hash) {
        $hash = "#" + $hash;
        pgurl = pgurl.replace($hash, "");
    } else {
        pgurl = pgurl.replace("#", "");
    }

    $(".header-menu li a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
            $(this).parent().addClass("current_page_item");
            $(this).parents('li').addClass("current_page_item");
        }
    });
	
	/*----------------------------------------------------*/
    /*  SMOOTH MENU JS
    /*---------------------------------------------------*/
	$('.header-menu li a').bind('click', function(event) {
      var $anchor = $(this);
      var headerH = '73';
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
      }, 1200, 'easeOutSine');

      event.preventDefault();
    });
	//jQuery smoth scroll    
    $('.slicknav_nav li a').bind('click', function(event) {
      var $anchor = $(this);
      var headerH = '73';
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
      }, 1200, 'easeOutSine');

      event.preventDefault();
    });
	/*----------------------------------------------------*/
    /*  OWL-CAROUSEL SLIDER FUNCTIONS
    /*---------------------------------------------------*/
	if ($.fn.owlCarousel) {
		//Owl-Carousel Slider Activation Functions
	    var heroSlider = $('.hero-area');
	    var appScreen = $(".app-screens");
	    var screenshort = $(".screenshort-slider");
	    var testimonialSlider = $(".tastimonial-slider");
	    heroSlider.owlCarousel({
	        items: 1,
	        loop: true,
	        animateIn: 'fadeIn',
		    animateOut: 'fadeOut',
	        smartSpeed: 1000,
	        autoplayTimeout: 5000,
	        mouseDrag: true,
	        touchDrag: false,
	        autoplay: true,
	        nav: false,
	        responsive: {
	          0: {
	            items: 1,
	          },
	          480: {
	            items: 1,
	          },
	          768: {
	            items: 1,
	          }
	        }
      	});
      	//Owl-Carousel Translate Function
	    heroSlider.on('translate.owl.carousel', function(){
	        var layer = $("[data-animation]");
	        layer.each(function() {
	            var animation_name = $(this).data('animation');
	            $(this).removeClass('animated ' + animation_name).css('opacity', '0');
	        });
	    });
	    //Owl-Carousel Delay Function
	    $("[data-delay]").each(function () {
	        var animation_delay = $(this).data('delay');
	        $(this).css('animation-delay', animation_delay);
	    });
	    //Owl-Carousel Duration Function
	    $("[data-duration]").each(function () {
	        var animation_duration = $(this).data('duration');
	        $(this).css('animation-duration', animation_duration);
	    });
	    //Owl-Carousel Translated Function
	    heroSlider.on('translated.owl.carousel', function () {
	        var layer = heroSlider.find('.owl-item.active').find("[data-animation]");
	        layer.each(function () {
	            var animation_name = $(this).data('animation');
	            $(this).addClass('animated ' + animation_name).css('opacity', '1');
	        });
	    });
	    var dot = $('.hero-area .owl-dot');
		dot.each(function() {
			var index = $(this).index();
			var number = ("<span>slide </span>");
		  $(this).html(index + 1).append(number);
		});
		//Owl-Carousel Apps-Screen Activation Functions
		appScreen.owlCarousel({
			center: true,
			loop: true,
			autoWidth: true,
			smartSpeed: 1000,
	        autoplayTimeout: 5000,
	        mouseDrag: true,
	        touchDrag: false,
	        autoplay: true,
	        nav: false,
		});
		//Owl-Carousel Screen-Short Activation Functions
		screenshort.owlCarousel({
			center: true,
			items: 3,
			loop: true,
			autoWidth: true,
			smartSpeed: 1000,
	        autoplayTimeout: 5000,
	        mouseDrag: true,
	        touchDrag: false,
	        autoplay: true,
	        nav: true,
	        navText: ['<i class="flaticon-angle-pointing-to-left"></i>', '<i class="flaticon-angle-arrow-pointing-to-right"></i>']
		});
		//Owl-Carousel Testimonial-Slider Activation Functions
		testimonialSlider.owlCarousel({
			items: 1,
	        loop: true,
	        smartSpeed: 1000,
	        autoplayTimeout: 5000,
	        mouseDrag: true,
	        touchDrag: false,
	        autoplay: true,
	        nav: false,
		});

    };
    /*-----------------------*/
    /*  MAGNIF-POPUP
    /*-----------------------*/
    var magnifPopup = function() {
      $('.video-btn').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-with-zoom',
        gallery: {
          enabled: true
        },
      });
    };
    magnifPopup();
    $('a.video-btn').on('mouseenter', function() {
      $(this).tab('show');
    });
    /*---------------------*/
    /*  COUNTER UP
    /*---------------------*/
$('.count').counterUp({
      delay: 30,
      time: 3000
    });
	/*--------------------------------------*/
    /*  TESTIMONIAL SLICK CAROUSEL
    /*--------------------------------------*/
	var TeSTExt = $('#client-slide-text');
    TeSTExt.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
		autoplay: false,
		autoplaySpeed: 4000,
        asNavFor: '#client-slide-image',
		animateIn: 'fadeInLeft',
        animateOut: 'fadeOutDown',
    });
	/* Testimonial slick carousel as nav */
	var TeSImg = $('#client-slide-image');
    TeSImg.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#client-slide-text',
        dots: false,
        arrows: false,
        centerMode: true,
		autoplay: false,
		autoplaySpeed: 4000,
        focusOnSelect: true,
        centerPadding: '120px',
        responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				centerPadding: '0px',
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				centerPadding: '20px',
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				centerPadding: '0px',
			  }
			}
		]
    });
	/*------------------------------*/
    /* TEXT ANIMATION ACTIVE
    /*-----------------------------*/
	$('.banner-effect').textillate({ in : {
            effect: 'fadeInRight',
            delayScale: 2
        },
        out: {
            effect: 'flipOutY',
            sync: true
        },
        loop: true
    });
	/*------------------------------*/
    /* MAILCHIMP START
    /*-----------------------------*/
    if ($('.mailchimp').length > 0) {
        /*  MAILCHIMP  */
        $('.mailchimp').ajaxChimp({
            language: 'es',
            callback: mailchimpCallback,
            url: "https://themeeverest.us17.list-manage.com/subscribe/post?u=cabddcb37c592ee83912956ca&amp;id=827328a9cf" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html('<i class="fa fa-check"></i><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
            $('.subscription-error').html('<i class="fa fa-times"></i><br/>' + resp.msg).fadeIn(1000);
        }
    }
    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: 'We have sent you a confirmation email',
        1: 'Please enter a value',
        2: 'An email address must contain a single @',
        3: 'The domain portion of the email address is invalid (the portion after the @: )',
        4: 'The username portion of the email address is invalid (the portion before the @: )',
        5: 'This email address looks fake or invalid. Please enter a real email address'
    };
	/*------------------------------*/
    /* SCROLL TOP FUNCTION
    /*-----------------------------*/
    function scrollToTop($topClass){   
		var top_0 = {scrollTop:0};
		var topClass = $($topClass);
		topClass.on("click" , function(e){
			$("html,body").animate(top_0,1000);
			return false;
		});
		$(window).scroll(function(){
			if($(this).scrollTop() > 400) {
				topClass.fadeIn(500);
			}
			else {
				topClass.fadeOut(500);
			}
		});
	};
	scrollToTop('.back-to-top');
	/*------------------------------*/
    /* WOW JS ACTIVE
    /*-----------------------------*/
	new WOW().init();
	

jQuery(window).load(function() {
    $(".preloader").fadeOut(1000);

  });

 
})(jQuery);