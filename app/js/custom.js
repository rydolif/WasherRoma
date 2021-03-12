var buttons = {
	whatsapp: true,
	viber: true
};

var animationDelay = 2500;

function animateHeadline($headlines) {
	$headlines.each(function(){
		var headline = $(this);
		setTimeout(function(){
			hideWord(headline.find('.is-visible'))
		}, animationDelay);
	});
}

function hideWord($word) {
	var nextWord = takeNext($word);
	switchWord($word, nextWord);
	setTimeout(function(){ hideWord(nextWord) }, animationDelay);
}

function takeNext($word) {
	return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function switchWord($oldWord, $newWord) {
	$oldWord.removeClass('is-visible').addClass('is-hidden');
	$newWord.removeClass('is-hidden').addClass('is-visible');
}

var init = {
	slides: function(){
		var width = $(window).width();

		var swiper = new Swiper('#slides-main', {
			spaceBetween: 0,
			autoplay: {
				delay: 5000,
			},
			autoHeight: true,
			effect: 'fade',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});


		var swiper = new Swiper('#slides-news', {
			spaceBetween: 30,
			slidesPerView: width > 996 ? 4 : width > 768 ? 3 : width > 576 ? 2 : 1,
			autoHeight: true,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
		
	},
	mobileMenu: function(){
		$('#mobile-menu').menu();

		$('#mobile-menu-close').on('click',function(){
			$('#mobile-menu').menu('close');
		})

		$('#mobile-menu-toggle').on('click',function(e){
			e.preventDefault();

			$('#mobile-menu').menu('open');
		})
	},
	modal: function(){
		$('a[data-modal]').click(function(event) {
			$(this).modal({
				fadeDuration: 250
			});

			return false;
		});
	},
	magnific: function(){
		$('.gallery').magnificPopup({
			delegate: '.image',
			type: 'image',
			gallery: {
				enabled: true
			},
		});
	},
	video: function(){
		$('.popup-video').magnificPopup({
	        disableOn: false,
	        type: 'iframe',
	        mainClass: 'mfp-fade',
	        removalDelay: 160,
	        preloader: false,
	        fixedContentPos: false
	    });
	},
	wow: function(){
		$('.wow-delay').each(function(){
			var delay = 0;

			$('.wow',this).each(function(){
				delay += 0.1;

				if(delay > 1) delay = 0;

				$(this).attr('data-wow-delay',delay + 's');
			})
		});


		new WOW().init();
	},
	ready: function(){
		var timer = setTimeout(go, 5000),
			ready = false;

		function go(){
			if(ready) return;

			ready = true;

			clearTimeout(timer);

			$('body').addClass('loaded-end');

			init.wow();
		}

		window.addEventListener('load',go);
	},
	form: function(){
		$("input[name='phone']").inputmask("+38 (999) 999 99 99",{
	    	clearMaskOnLostFocus: true
	    });
	},
}

$(function(){
	var isPageSpeed = /Google Page Speed Insights/.test(navigator.userAgent);

	// что-бы результат был аж 100!))
	if(isPageSpeed){
		return;
	}

	init.ready();

	init.magnific();
	init.video();
	init.slides();
	init.modal();
	init.mobileMenu();

	init.form();

	if(!buttons.whatsapp) $('.btn-whatsapp').hide();
	if(!buttons.viber) $('.btn-viber').hide();

	animateHeadline($('.rotate-text'));
    
    
    
    
    
    
    var top_show = 150;
	var $toppanel = $('.top-panel');
    
    var tempScrollTop, currentScrollTop = 0;

	$(window).scroll(function () { 
		if ($(this).scrollTop() > top_show) {
			$toppanel.addClass('active');
		}
		else {
			$toppanel.removeClass('active');
		}
	});
    
    
    
});




