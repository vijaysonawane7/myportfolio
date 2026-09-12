/* =========================================================
   Vijay Sonawane — portfolio interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */
  var THEME_KEY = 'vs-portfolio-theme';
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* private mode */ }
  }

  var storedTheme = null;
  try { storedTheme = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }

  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.getElementById('nav');

  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 20);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Hero typewriter ---------- */
  var typer = document.getElementById('typer');
  var phrases = [
    'building apps that scale.',
    'writing code to change the world.',
    'turning coffee into clean architecture.',
    'shipping fast, breaking nothing.',
    'obsessed with the last 10 milliseconds.'
  ];

  if (typer) {
    if (prefersReducedMotion) {
      typer.textContent = phrases[0];
    } else {
      var pIndex = 0;
      var cIndex = 0;
      var deleting = false;

      (function tick() {
        var phrase = phrases[pIndex];
        cIndex += deleting ? -1 : 1;
        typer.textContent = phrase.slice(0, cIndex);

        var delay = deleting ? 32 : 62;

        if (!deleting && cIndex === phrase.length) {
          deleting = true;
          delay = 1900;
        } else if (deleting && cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          delay = 420;
        }

        setTimeout(tick, delay);
      })();
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(entry.target.parentElement.children);
        entry.target.style.transitionDelay = Math.min(siblings.indexOf(entry.target), 5) * 70 + 'ms';
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('.stat__num');

  function runCounter(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReducedMotion) { el.textContent = String(target); return; }

    var duration = 1400;
    var started = null;

    function step(now) {
      if (started === null) started = now;
      var progress = Math.min((now - started) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Active section in nav ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var linkFor = {};

  document.querySelectorAll('.nav__links a[href^="#"]').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(linkFor).forEach(function (id) { linkFor[id].classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.25, rootMargin: '-25% 0px -55% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
