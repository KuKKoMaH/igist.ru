$(function () {

  // Preloader
  $(window).on('load', function () {
    setTimeout(function () {
      $('.preloader').hide('fade', 700);
    }, 100);
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
    if (that.hasClass('mute')) {
      that.removeClass('mute').find('.fa').removeClass('fa-volume-off').addClass('fa-music');
      music.play();
    }
    else {
      that.addClass('mute').find('.fa').removeClass('fa-music').addClass('fa-volume-off');
      music.pause();
    }
  });
  $("#container").mouseenter(function () {
    audio.play();
  }).mouseleave(function () {
    audio.pause();
  });

  $('#barba-wrapper').scroll(function ( e ) {
    var scrolled = $('#barba-wrapper').scrollTop();
    $('.header-bg').css('margin-top', +(scrolled * 0.35) + 'px');
  });

  // Bg full
  function initPortfolio() {
    $('.bg-full').each(function () {
      var pic = $(this).find('.bg-full-img').attr('src');
      $(this).css({
        'background':              'url(' + pic + ') center center no-repeat',
        'background-size':         'cover',
        '-webkit-background-size': 'cover'
      });
    });

    // Project colors
    if ($('.project-color').size() > 0) {
      $('.project-color').each(function () {
        var that = $(this);
        var color = that.attr('data-color');
        that.css({ "background": color });
      });
    }
    if ($('.project-slide').size() > 0) {
      $('.project-slide').each(function () {
        var that = $(this);
        var color = that.attr('data-color');
        that.css({ "background": color });
      });
    }

    // Project slider
    $('.project-slider').slick({
      fade:           true,
      autoplay:       true,
      slidesToShow:   1,
      slidesToScroll: 1,
      asNavFor:       '.project-slider-nav',
      dots:           false,
      arrows:         false,
      easing:         'swing',
      autoplaySpeed:  6000,
      speed:          700,
      draggable:      false,
      pauseOnFocus:   false,
      pauseOnHover:   false
    });
    $('.project-slider-nav').slick({
      asNavFor:      '.project-slider',
      dots:          false,
      arrows:        false,
      focusOnSelect: true,
      autoplaySpeed: 6000,
      speed:         700,
      draggable:     false,
      pauseOnFocus:  false,
      pauseOnHover:  false
    });
    $('.project-slider-nav a').click(function ( e ) {
      e.preventDefault();
      $('.project-slider').slick('slickPause');
      $('.project-slider-nav').slick('slickPause');
    });

    function PSN() {
      var width = $('.project-slider-nav-wrap').width();
      var height = $('.project-slider-nav-wrap').height();
      $('.project-slider-nav-wrap').css({ 'margin-left': -width / 2 + height / 2 - 2, 'margin-top': width / 2 - 28 });
    }

    setTimeout(function () {
      PSN();
    }, 200);
    setTimeout(function () {
      PSN();
    }, 250);
    $('.project-slider').on('afterChange', function ( event, slick, direction ) {
      setTimeout(function () {
        if ($('.project-slider .project-slide.slick-current .project-slide-mockup-1').size() > 0) {
          $('.project-slide-mockup-1').removeClass('hideaway');
          setTimeout(function () {
            $('.project-slide-mockup-2').removeClass('hideaway');
          }, 100);
        }
        else {
          $('.project-slide-mockup-1').addClass('hideaway');
          $('.project-slide-mockup-2').addClass('hideaway');
        }
      }, 100);
    });

    // Resize
    $(window).resize(function () {
      PSN();
    });
  }

  function destroyPortfolio() {
    $('.project-slider').slick('destroy');
    $('.project-slider-nav').slick('destroy');
    $(window).off('resize');
  }

  function initFront() {
    $('.main-menu a').click(function ( e ) {
      e.preventDefault();
      var div = $(this).attr('href');
      $('#barba-wrapper').animate({
        scrollTop: $(div).offset().top
      }, 700, 'swing');
    });

    $('.mouse-down').click(function ( e ) {
      e.preventDefault();
      var div = $(this).attr('href');
      $("html, body").animate({
        scrollTop: $(div).offset().top
      }, 700, 'swing');
    });

    $('.item').each(function () {
      var pic = $(this).find('.pic').attr('src');
      $(this).backstretch(pic);
    });
  }

  initFront();
  initPortfolio();

  Barba.Pjax.init();
  Barba.Prefetch.init();

  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      // $(this.oldContainer).css('overflow', 'hidden');
      $('body').css('overflow', 'hidden');
      $.when(this.newContainerLoading, this.fadeOut())
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      return $('.preloader').show('fade', 700).promise();
    },

    fadeIn: function () {
      var namespace = Barba.HistoryManager.currentStatus().namespace;

      if (namespace === 'front') {
        destroyPortfolio();
        initFront();
      } else if (namespace === 'project') {
        initPortfolio();
      }
      $('body').css('overflow', 'auto');
      $('.preloader').hide('fade', 700);
      this.done();
    }
  });

  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };
});


			
		
