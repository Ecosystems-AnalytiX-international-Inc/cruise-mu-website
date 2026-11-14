/**
 * CruisE Website Global Navigation & UI Scripts
 * Copyright (c) 2026 Ecosystems & AnalytiX International Inc.
 */
(function() {
  'use strict';

  // Mobile Menu Drawer Toggle
  function initMobileMenu() {
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var drawer = document.getElementById('mobileDrawer');
    if (!menuBtn || !drawer) return;

    function openDrawer() {
      menuBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }

    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close on clicking any drawer link
    var drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeDrawer();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // Smooth scroll offset for hash anchors
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = target.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initMobileMenu();
      initSmoothScroll();
    });
  } else {
    initMobileMenu();
    initSmoothScroll();
  }
})();
