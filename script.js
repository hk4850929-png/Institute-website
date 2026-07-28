/* =========================================================
   EduTech Institute — Main JavaScript (Vanilla)
   Handles: smooth scroll (Lenis), sticky nav, mobile drawer,
   scroll-reveal, counters, FAQ accordion, gallery lightbox,
   contact form validation, newsletter, back-to-top, marquee.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. Lenis smooth momentum scrolling ---------- */
  let lenis = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return; // graceful fallback to native
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- 2. Sticky nav state ---------- */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 30); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. Mobile drawer (hamburger) ---------- */
  function initDrawer() {
    var burger = document.querySelector('.hamburger');
    var drawer = document.querySelector('.drawer');
    if (!burger || !drawer) return;
    var toggle = function (open) {
      burger.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    };
    burger.addEventListener('click', function () { toggle(!drawer.classList.contains('open')); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
  }

  /* ---------- 4. Anchor smooth-scroll (works with Lenis or native) ---------- */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) { lenis.scrollTo(target, { offset: -80 }); }
        else { target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* ---------- 5. Scroll reveal via IntersectionObserver ---------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- 6. Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var dur = 1800, start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(eased * target);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---------- 7. FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var q = item.querySelector('.faq__q');
      var a = item.querySelector('.faq__a');
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq__item.open').forEach(function (o) {
          o.classList.remove('open'); o.querySelector('.faq__a').style.maxHeight = null;
        });
        if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
      });
    });
  }

  /* ---------- 8. Gallery lightbox ---------- */
  function initLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
    var box = document.querySelector('.lightbox');
    if (!items.length || !box) return;
    var img = box.querySelector('img');
    var current = 0;
    var srcs = items.map(function (it) { return it.querySelector('img').src; });

    function show(i) { current = (i + srcs.length) % srcs.length; img.src = srcs[current]; }
    function open(i) { show(i); box.classList.add('open'); document.body.style.overflow = 'hidden'; if (lenis) lenis.stop(); }
    function close() { box.classList.remove('open'); document.body.style.overflow = ''; if (lenis) lenis.start(); }

    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- 9. Contact form validation ---------- */
  function initForm() {
    var form = document.querySelector('#contact-form');
    if (!form) return;
    var note = form.querySelector('.form-note');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRe = /^[+\d][\d\s-]{6,}$/;

    function setError(field, on) { field.closest('.field').classList.toggle('error', on); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var name = form.name, email = form.email, phone = form.phone, message = form.message;
      setError(name, !name.value.trim()); if (!name.value.trim()) ok = false;
      setError(email, !emailRe.test(email.value)); if (!emailRe.test(email.value)) ok = false;
      setError(phone, !phoneRe.test(phone.value)); if (!phoneRe.test(phone.value)) ok = false;
      setError(message, message.value.trim().length < 10); if (message.value.trim().length < 10) ok = false;
      if (!ok) return;
      note.classList.add('show');
      note.querySelector('span').textContent = 'Thank you, ' + name.value.trim().split(' ')[0] + '! Our admissions team will contact you within 24 hours.';
      form.reset();
      setTimeout(function () { note.classList.remove('show'); }, 6000);
    });
    // clear error on input
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () { el.closest('.field').classList.remove('error'); });
    });
  }

  /* ---------- 10. Newsletter (footer) ---------- */
  function initNewsletter() {
    document.querySelectorAll('.newsletter').forEach(function (nl) {
      nl.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = nl.querySelector('input');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { input.style.color = '#ff9f9f'; return; }
        input.value = ''; input.placeholder = 'Subscribed! ✓'; input.style.color = '#7dd3fc';
      });
    });
  }

  /* ---------- 11. Back to top ---------- */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () { btn.classList.toggle('show', window.scrollY > 500); }, { passive: true });
    btn.addEventListener('click', function () { if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- 12. Hero parallax on pointer move ---------- */
  function initParallax() {
    var frame = document.querySelector('.hero__img-frame');
    if (!frame || window.matchMedia('(max-width: 820px)').matches) return;
    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = 'translate(' + (x * -18) + 'px,' + (y * -18) + 'px)';
    });
    hero.addEventListener('mouseleave', function () { frame.style.transform = ''; });
  }

  /* ---------- 13. Footer year ---------- */
  function initYear() { var y = document.querySelector('#year'); if (y) y.textContent = new Date().getFullYear(); }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLenis(); initNav(); initDrawer(); initAnchors(); initReveal();
    initCounters(); initFaq(); initLightbox(); initForm(); initNewsletter();
    initToTop(); initParallax(); initYear();
  });
})();
