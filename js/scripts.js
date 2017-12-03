$(function() {

	// Preloader
	$(window).on('load', function () {
		setTimeout(function () {
			$('.preloader').hide('fade', 700);
		}, 100);
	});

	// Links
	$('.link-inner').click(function(e){
		e.preventDefault();
		var that = $(this);
		$('.preloader').show('fade', 700);
		// var url = $(location).attr('href');
		setTimeout(function () {
			var url = that.attr('href');
			$(location).attr('href', url);
		}, 800);
	});

	// Main menu
	$('.main-menu a').click(function (e) {
		e.preventDefault();
		var div = $(this).attr('href');
		$("html, body").animate({
			scrollTop: $(div).offset().top
		}, 700, 'swing');
	});
	$('.mouse-down').click(function (e) {
		e.preventDefault();
		var div = $(this).attr('href');
		$("html, body").animate({
			scrollTop: $(div).offset().top
		}, 700, 'swing');
	});

	// Bg full
	$('.bg-full').each(function(){
		var pic = $(this).find('.bg-full-img').attr('src');
		$(this).css({'background':'url('+pic+') center center no-repeat', 'background-size':'cover', '-webkit-background-size': 'cover'});
	});

	// History back
	$('.history-back-btn').click(function(){
		window.history.back();
	});

	// Project colors
	if ( $('.project-color').size() > 0 ){
		$('.project-color').each(function () {
			var that = $(this);
			var color = that.attr('data-color');
			that.css({"background": color});
		});
	}
	if ( $('.project-slide').size() > 0 ){
		$('.project-slide').each(function () {
			var that = $(this);
			var color = that.attr('data-color');
			that.css({"background": color});
		});
	}

	// Project slider
	$('.project-slider').slick({
		fade: true,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.project-slider-nav',
		dots: false,
		arrows: false,
		easing: 'swing',
		autoplaySpeed: 6000,
		speed: 700,
		draggable: false,
		pauseOnFocus: false,
		pauseOnHover: false
	});
	$('.project-slider-nav').slick({
		asNavFor: '.project-slider',
		dots: false,
		arrows: false,
		focusOnSelect: true,
		autoplaySpeed: 6000,
		speed: 700,
		draggable: false,
		pauseOnFocus: false,
		pauseOnHover: false
	});
	$('.project-slider-nav a').click(function(e){
		e.preventDefault();
		$('.project-slider').slick('slickPause');
		$('.project-slider-nav').slick('slickPause');
	});
	function PSN() {
		var width = $('.project-slider-nav-wrap').width();
		var height = $('.project-slider-nav-wrap').height();
		$('.project-slider-nav-wrap').css({'margin-left': -width/2 + height/2 - 2, 'margin-top': width/2 - 28});
	}
	setTimeout(function () {
		PSN();
	}, 200);
	setTimeout(function () {
		PSN();
	}, 250);
	$('.project-slider').on('afterChange', function(event, slick, direction){
		setTimeout(function () {
			if ( $('.project-slider .project-slide.slick-current .project-slide-mockup-1').size() > 0 ){
				$('.project-slide-mockup-1').removeClass('hideaway');
				setTimeout(function () {
					$('.project-slide-mockup-2').removeClass('hideaway');
				}, 100);
			}
			else{
				$('.project-slide-mockup-1').addClass('hideaway');
				$('.project-slide-mockup-2').addClass('hideaway');
			}
		}, 100);
	});

	// Resize
	$(window).resize(function(){
		PSN();
	});

	// Music
	var music = $("#music")[0];
	music.volume = 0;
	setTimeout(function () {
		music.play();
		music.volume = 0.02;
	}, 500);
	setTimeout(function () {
		music.volume = 0.04;
	}, 1000);
	setTimeout(function () {
		music.volume = 0.06;
	}, 1500);
	setTimeout(function () {
		music.volume = 0.08;
	}, 2000);
	setTimeout(function () {
		music.volume = 0.1;
	}, 2500);
	setTimeout(function () {
		music.volume = 0.15;
	}, 3000);
	$('.music-btn').click(function () {
		var that = $(this);
		if ( that.hasClass('mute') ){
			that.removeClass('mute').find('.fa').removeClass('fa-volume-off').addClass('fa-music');;
			music.play();
		}
		else{
			that.addClass('mute').find('.fa').removeClass('fa-music').addClass('fa-volume-off');
			music.pause();
		}
	});
	$("#container").mouseenter(function() {
		audio.play();
	}).mouseleave(function() {
		audio.pause();
	});

	// Parallax
	function parallax(){
		var scrolled = $(window).scrollTop();
		var wheight = $(window).height();
		$('.header-bg').css('margin-top', +(scrolled * 0.35) + 'px');
	}
	$(window).scroll(function(e){
		parallax();
		// var st = $(document).scrollTop();
		// var wh = $(window).height();
		// var footerOffset = $('.footer-bg').offset().top;
		// if (st > footerOffset - wh){
		// 	$('.footer-bg').css('margin-bottom', -((st-wh) * 0.35) + 'px');
		// }
	});

	// Backstretch
	$('.item').each(function(){
		var pic = $(this).find('.pic').attr('src');
		$(this).backstretch(pic);
	});

	// Portfolio
	// var $grid = $('.portfolio').isotope({
	// 	itemSelector: '.col',
	// 	layoutMode: 'packery'
	// });
	// // filter items on button click
	// $('.portfolio-menu').on( 'click', 'a', function(e) {
	// 	e.preventDefault();
	// 	var filterValue = $(this).attr('data-filter');
	// 	$grid.isotope({ filter: filterValue });
	// });

});


			
		
