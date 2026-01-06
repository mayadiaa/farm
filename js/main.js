(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });
    
})(jQuery);

// custom
$('.testi-carousel').owlCarousel({
    loop:true,
    margin:24,
    nav:true,
    dots:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive:{
      0:{items:1},
      768:{items:1},
      992:{items:2}
    }
  });
// faq
document.querySelectorAll('.faq-toggle').forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // close all (optional) – comment out two lines below to allow multiple open
    document.querySelectorAll('.faq-toggle[aria-expanded="true"]')
      .forEach(b=>b.setAttribute('aria-expanded','false'));
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

// ==== Animate.css on scroll ====
(function () {
  function getAnimClass(el) {
    if (el.dataset.animate) return el.dataset.animate;
    for (const c of el.classList) {
      if (c.startsWith('animate__') && c !== 'animate__animated') {
        return c;
      }
    }
    
    return 'animate__fadeInUp';
  }

  function prepEl(el) {
    const anim = getAnimClass(el);
    el.__animClass = anim;
    el.classList.add('animate__animated');
    el.classList.remove(anim);
    el.classList.add('pre-animate'); 
    el.style.visibility = 'visible';
  }

  function runAnim(el) {
    el.classList.remove('pre-animate');
    el.classList.add(el.__animClass);
    const once = el.dataset.once !== 'false';
    if (!once) {
      el.addEventListener('animationend', () => {
        el.classList.remove(el.__animClass);
        el.classList.add('pre-animate');
      }, { once: true });
    }
  }

  function ready(fn){ 
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    const targets = Array.from(document.querySelectorAll(
      '[data-animate], .animate-on-scroll, .animate__animated'
    )).filter(el => {
      return el.hasAttribute('data-animate') || [...el.classList].some(c => c.startsWith('animate__') && c !== 'animate__animated');
    });

    if (!targets.length) return;

    targets.forEach(prepEl);

    const useIO = 'IntersectionObserver' in window;
    if (useIO) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          runAnim(el);
          if (el.dataset.once !== 'false') io.unobserve(el);
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

      targets.forEach(el => io.observe(el));
    } else {
      // fallback
      const onScroll = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        targets.forEach(el => {
          if (el.__done && el.dataset.once !== 'false') return;
          const r = el.getBoundingClientRect();
          const visible = r.top < vh * 0.8 && r.bottom > vh * 0.2;
          if (visible) { runAnim(el); el.__done = true; }
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
    }
  });
})();
// 
/* ===============================
   NAVBAR: تحسين سلوك القايمة على الموبايل
   - تقفل لما أضغط على أي لينك
   - تقفل لما أضغط برّة الناف
   - من غير تغيير ولا اسم كلاس
   =============================== */

(function () {
  // عناصر الناف
  var navCollapse = document.getElementById('navbarCollapse');
  if (!navCollapse) return;

  // اقفل القايمة عند الضغط على أي رابط داخلها
  var navLinks = navCollapse.querySelectorAll('.nav-link, .lang-switch a');
  navLinks.forEach(function (lnk) {
    lnk.addEventListener('click', function () {
      if (navCollapse.classList.contains('show')) {
        var coll = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        coll.hide();
      }
    });
  });

  // اقفل القايمة لو كبست برّة الناف
  document.addEventListener('click', function (e) {
    var nav = document.querySelector('.navbar');
    if (!nav) return;

    var isInsideNav = nav.contains(e.target);
    var isToggler = e.target.closest('.navbar-toggler');
    if (!isInsideNav && navCollapse.classList.contains('show') && !isToggler) {
      var coll = bootstrap.Collapse.getOrCreateInstance(navCollapse);
      coll.hide();
    }
  });

  // اختيارية: بدّل أيقونة التوجل (لو حابة)
  var toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    navCollapse.addEventListener('shown.bs.collapse', function(){ toggler.classList.add('is-open'); });
    navCollapse.addEventListener('hidden.bs.collapse', function(){ toggler.classList.remove('is-open'); });
  }
})();
// wp pop up
  window.addEventListener("load", function () {
    var modalEl = document.getElementById("whatsModal");
    if (!modalEl) return;

    var modal = new bootstrap.Modal(modalEl);

    setTimeout(function () {
      modal.show();
    }, 800);
  });

// single blog carsoul
  new Swiper(".relatedSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".relatedSwiper .swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".rel-next",
      prevEl: ".rel-prev"
    },
    breakpoints: {
      0:   { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });

// news carosoul


