/* ============================================
   SmarTok — Landing Page Interactions
   Scroll animations, navbar, mobile menu
   ============================================ */

(function () {
    'use strict';

    /* ===== NAVBAR SCROLL EFFECT ===== */
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    /* ===== MOBILE NAVIGATION TOGGLE ===== */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ===== SCROLL REVEAL — IntersectionObserver ===== */
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();
            var offsetTop = targetEl.offsetTop - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    /* ===== DYNAMIC YOUTUBE VIDEO SHOWCASE ===== */
    function loadYouTubeVideos() {
        var container = document.getElementById('videos-container');
        if (!container) return;

        fetch('videos.json')
            .then(function (response) {
                if (!response.ok) throw new Error('Failed to load videos.json');
                return response.json();
            })
            .then(function (videos) {
                if (!videos || videos.length === 0) {
                    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;">Videos coming soon.</p>';
                    return;
                }

                container.innerHTML = '';
                videos.forEach(function (video) {
                    var card = document.createElement('div');
                    card.className = 'video-card reveal';

                    var iframe = document.createElement('iframe');
                    iframe.src = video.url;
                    iframe.title = video.title || 'SmarTok Video';
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    iframe.setAttribute('allowfullscreen', '');
                    card.appendChild(iframe);

                    if (video.title) {
                        var titleEl = document.createElement('div');
                        titleEl.className = 'video-card-title';
                        titleEl.textContent = video.title;
                        card.appendChild(titleEl);
                    }

                    container.appendChild(card);
                });

                // Observe newly added video cards for scroll reveal
                container.querySelectorAll('.reveal').forEach(function (el) {
                    revealObserver.observe(el);
                });
            })
            .catch(function (err) {
                console.error('[YouTube Showcase] Error loading videos:', err);
                container.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;">Unable to load videos at this time.</p>';
            });
    }

    loadYouTubeVideos();

    /* ===== INITIAL NAVBAR STATE ===== */
    handleNavbarScroll();

})();
