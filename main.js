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

    // Store fetched video data for modal use
    var videoData = [];

    // Convert any YouTube URL format into a proper embed URL
    function convertToEmbedUrl(url) {
        if (!url || typeof url !== 'string') return '';

        // Already an embed URL
        var embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return 'https://www.youtube.com/embed/' + embedMatch[1];

        // Standard watch URL: youtube.com/watch?v=XYZ
        var watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (watchMatch) return 'https://www.youtube.com/embed/' + watchMatch[1];

        // Short URL: youtu.be/XYZ
        var shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (shortMatch) return 'https://www.youtube.com/embed/' + shortMatch[1];

        // Shorts URL: youtube.com/shorts/XYZ
        var shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
        if (shortsMatch) return 'https://www.youtube.com/embed/' + shortsMatch[1];

        // Fallback: return as-is if no known pattern matched
        return url;
    }

    // Detect if a video URL is vertical (Shorts) or horizontal
    function detectOrientation(url) {
        if (!url) return 'horizontal';
        if (url.indexOf('/shorts/') !== -1) return 'vertical';
        return 'horizontal';
    }

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

                // Store for modal use
                videoData = videos;

                container.innerHTML = '';
                videos.forEach(function (video, index) {
                    var card = document.createElement('div');
                    card.className = 'video-card reveal';
                    card.setAttribute('data-video-index', index);

                    var embedUrl = convertToEmbedUrl(video.url);

                    var iframe = document.createElement('iframe');
                    iframe.src = embedUrl;
                    iframe.title = video.title || 'SmarTok Video';
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    iframe.setAttribute('allowfullscreen', '');
                    iframe.setAttribute('loading', 'lazy');
                    card.appendChild(iframe);

                    // Invisible overlay to intercept clicks before YouTube iframe can
                    var clickOverlay = document.createElement('div');
                    clickOverlay.className = 'video-click-overlay';
                    card.appendChild(clickOverlay);

                    if (video.title) {
                        var titleEl = document.createElement('div');
                        titleEl.className = 'video-card-title';
                        titleEl.textContent = video.title;
                        card.appendChild(titleEl);
                    }

                    // Open video modal on card click
                    card.addEventListener('click', function () {
                        openVideoModal(index);
                    });

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

    /* ===== VIDEO FEED MODAL ===== */
    var videoModal = document.getElementById('video-modal');
    var videoModalFeed = document.getElementById('video-modal-feed');
    var videoModalClose = document.getElementById('video-modal-close');
    var videoModalObserver = null;

    // Activate a slide's iframe: set src with autoplay
    function activateVideoSlide(slide) {
        var iframe = slide.querySelector('iframe');
        if (!iframe) return;
        var embedUrl = iframe.getAttribute('data-src');
        if (!embedUrl) return;
        if (iframe.src !== embedUrl + '?autoplay=1') {
            iframe.src = embedUrl + '?autoplay=1';
        }
    }

    // Deactivate a slide's iframe: clear src to stop playback
    function deactivateVideoSlide(slide) {
        var iframe = slide.querySelector('iframe');
        if (!iframe) return;
        if (iframe.src) {
            iframe.src = '';
        }
    }

    function openVideoModal(clickedIndex) {
        if (!videoData || videoData.length === 0) return;

        // Build modal feed slides — iframes start without src (no autoplay)
        videoModalFeed.innerHTML = '';
        videoData.forEach(function (video, index) {
            var slide = document.createElement('div');
            slide.className = 'video-modal-slide';
            slide.setAttribute('data-slide-index', index);

            var embedUrl = convertToEmbedUrl(video.url);
            var orientation = detectOrientation(video.url);

            var iframe = document.createElement('iframe');
            iframe.setAttribute('data-src', embedUrl);
            iframe.title = video.title || 'SmarTok Video';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('data-orientation', orientation);
            slide.appendChild(iframe);

            // Transparent overlay on top of iframe to capture touch/swipe gestures on mobile
            var swipeOverlay = document.createElement('div');
            swipeOverlay.className = 'modal-swipe-overlay';
            slide.appendChild(swipeOverlay);

            if (video.title) {
                var titleEl = document.createElement('div');
                titleEl.className = 'video-modal-slide-title';
                titleEl.textContent = video.title;
                slide.appendChild(titleEl);
            }

            videoModalFeed.appendChild(slide);
        });

        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Scroll to the clicked video first
        var targetSlide = videoModalFeed.querySelector('[data-slide-index="' + clickedIndex + '"]');
        if (targetSlide) {
            targetSlide.scrollIntoView({ behavior: 'auto' });
        }

        // Set up IntersectionObserver to only play the fully visible slide
        if (videoModalObserver) {
            videoModalObserver.disconnect();
        }

        videoModalObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                    // This slide is visible — activate its video
                    activateVideoSlide(entry.target);
                } else {
                    // This slide left view — stop its video
                    deactivateVideoSlide(entry.target);
                }
            });
        }, {
            root: videoModalFeed,
            threshold: [0, 0.7, 1]
        });

        var allSlides = videoModalFeed.querySelectorAll('.video-modal-slide');
        allSlides.forEach(function (slide) {
            videoModalObserver.observe(slide);
        });
    }

    function closeVideoModal() {
        // Remove focus from any element inside the modal before hiding
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }
        document.body.focus();

        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Disconnect observer and stop all playback
        if (videoModalObserver) {
            videoModalObserver.disconnect();
            videoModalObserver = null;
        }

        var iframes = videoModalFeed.querySelectorAll('iframe');
        iframes.forEach(function (iframe) {
            iframe.src = '';
        });

        // Clear slides after a short delay
        setTimeout(function () {
            videoModalFeed.innerHTML = '';
        }, 300);
    }

    videoModalClose.addEventListener('click', closeVideoModal);

    // Close video modal on background click
    videoModal.addEventListener('click', function (e) {
        if (e.target === videoModal) closeVideoModal();
    });

    // Close video modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (videoModal.classList.contains('active')) closeVideoModal();
            if (imageModal.classList.contains('active')) closeImageModal();
        }
    });

    /* ===== IMAGE CAROUSEL MODAL ===== */
    var imageModal = document.getElementById('image-modal');
    var imageModalClose = document.getElementById('image-modal-close');
    var carouselTrack = document.getElementById('carousel-track');
    var carouselDots = document.getElementById('carousel-dots');
    var carouselPrev = document.getElementById('carousel-prev');
    var carouselNext = document.getElementById('carousel-next');

    var carouselImages = [];
    var carouselIndex = 0;
    var carouselAutoPlayTimer = null;
    var carouselAutoPlayDelay = 5000;
    var carouselIsInteracting = false;
    var carouselTouchStartX = 0;
    var carouselTouchDeltaX = 0;
    var carouselTouchStartY = 0;
    var carouselIsDragging = false;

    // Collect gallery image sources
    function initGalleryImages() {
        var galleryItems = document.querySelectorAll('.gallery-item img');
        galleryItems.forEach(function (img, index) {
            carouselImages.push({
                src: img.src,
                alt: img.alt
            });

            // Open carousel on image click
            img.parentElement.addEventListener('click', function () {
                openImageModal(index);
            });
        });
    }

    function buildCarouselDots() {
        carouselDots.innerHTML = '';
        carouselImages.forEach(function (_, index) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (index === carouselIndex) dot.classList.add('active');
            dot.setAttribute('aria-label', 'Go to image ' + (index + 1));
            dot.addEventListener('click', function () {
                goToSlide(index);
                resetAutoPlay();
            });
            carouselDots.appendChild(dot);
        });
    }

    function updateCarouselDots() {
        var dots = carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, index) {
            if (index === carouselIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function updateCarouselTransform() {
        carouselTrack.style.transform = 'translateX(-' + (carouselIndex * 100) + '%)';
    }

    function goToSlide(index) {
        carouselIndex = index;
        updateCarouselTransform();
        updateCarouselDots();
    }

    function nextSlide() {
        carouselIndex = (carouselIndex + 1) % carouselImages.length;
        updateCarouselTransform();
        updateCarouselDots();
    }

    function prevSlide() {
        carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarouselTransform();
        updateCarouselDots();
    }

    function startAutoPlay() {
        stopAutoPlay();
        carouselAutoPlayTimer = setInterval(function () {
            if (!carouselIsInteracting && imageModal.classList.contains('active')) {
                nextSlide();
            }
        }, carouselAutoPlayDelay);
    }

    function stopAutoPlay() {
        if (carouselAutoPlayTimer) {
            clearInterval(carouselAutoPlayTimer);
            carouselAutoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function openImageModal(clickedIndex) {
        // Build carousel slides
        carouselTrack.innerHTML = '';
        carouselImages.forEach(function (image) {
            var slide = document.createElement('div');
            slide.className = 'carousel-slide';

            var img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            slide.appendChild(img);

            carouselTrack.appendChild(slide);
        });

        buildCarouselDots();
        carouselIndex = clickedIndex;
        updateCarouselTransform();
        updateCarouselDots();

        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        carouselIsInteracting = false;
        startAutoPlay();
    }

    function closeImageModal() {
        // Remove focus from any element inside the modal before hiding
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }
        document.body.focus();

        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        stopAutoPlay();
        carouselIsInteracting = false;
    }

    imageModalClose.addEventListener('click', closeImageModal);

    // Close image modal on background click
    imageModal.addEventListener('click', function (e) {
        if (e.target === imageModal) closeImageModal();
    });

    // Navigation arrows
    carouselPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        prevSlide();
        resetAutoPlay();
    });

    carouselNext.addEventListener('click', function (e) {
        e.stopPropagation();
        nextSlide();
        resetAutoPlay();
    });

    // Touch / swipe support for carousel
    carouselTrack.addEventListener('touchstart', function (e) {
        carouselTouchStartX = e.touches[0].clientX;
        carouselTouchStartY = e.touches[0].clientY;
        carouselTouchDeltaX = 0;
        carouselIsDragging = true;
        carouselIsInteracting = true;
        carouselTrack.classList.add('no-transition');
        stopAutoPlay();
    }, { passive: true });

    carouselTrack.addEventListener('touchmove', function (e) {
        if (!carouselIsDragging) return;
        carouselTouchDeltaX = e.touches[0].clientX - carouselTouchStartX;
        var deltaPercent = (carouselTouchDeltaX / carouselTrack.offsetWidth) * 100;
        carouselTrack.style.transform = 'translateX(calc(-' + (carouselIndex * 100) + '% + ' + carouselTouchDeltaX + 'px))';
    }, { passive: true });

    carouselTrack.addEventListener('touchend', function () {
        if (!carouselIsDragging) return;
        carouselIsDragging = false;
        carouselTrack.classList.remove('no-transition');

        var threshold = carouselTrack.offsetWidth * 0.2;
        if (carouselTouchDeltaX < -threshold) {
            nextSlide();
        } else if (carouselTouchDeltaX > threshold) {
            prevSlide();
        } else {
            updateCarouselTransform();
        }

        // Resume auto-play after a pause
        setTimeout(function () {
            carouselIsInteracting = false;
            startAutoPlay();
        }, 3000);
    });

    // Mouse drag support for desktop
    var mouseStartX = 0;
    var mouseDeltaX = 0;
    var mouseIsDragging = false;

    carouselTrack.addEventListener('mousedown', function (e) {
        mouseStartX = e.clientX;
        mouseDeltaX = 0;
        mouseIsDragging = true;
        carouselIsInteracting = true;
        carouselTrack.classList.add('no-transition');
        stopAutoPlay();
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!mouseIsDragging) return;
        mouseDeltaX = e.clientX - mouseStartX;
        carouselTrack.style.transform = 'translateX(calc(-' + (carouselIndex * 100) + '% + ' + mouseDeltaX + 'px))';
    });

    document.addEventListener('mouseup', function () {
        if (!mouseIsDragging) return;
        mouseIsDragging = false;
        carouselTrack.classList.remove('no-transition');

        var threshold = carouselTrack.offsetWidth * 0.2;
        if (mouseDeltaX < -threshold) {
            nextSlide();
        } else if (mouseDeltaX > threshold) {
            prevSlide();
        } else {
            updateCarouselTransform();
        }

        setTimeout(function () {
            carouselIsInteracting = false;
            startAutoPlay();
        }, 3000);
    });

    // Initialize gallery image collection after DOM is ready
    initGalleryImages();

    /* ===== INITIAL NAVBAR STATE ===== */
    handleNavbarScroll();

    /* ===== WEB APP DEMO OVERLAY ===== */
    var launchBtn = document.getElementById('launch-webapp-btn');
    var webappOverlay = document.getElementById('webapp-overlay');
    var webappIframe = document.getElementById('webapp-iframe');
    var webappExitBtn = document.getElementById('webapp-exit-btn');
    var WEBAPP_URL = 'https://smart.smartok.app';

    function openWebAppDemo() {
        if (!webappOverlay || !webappIframe) return;
        webappIframe.src = WEBAPP_URL;
        webappOverlay.classList.add('active');
        webappOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeWebAppDemo() {
        if (!webappOverlay || !webappIframe) return;
        webappIframe.src = '';
        webappOverlay.classList.remove('active');
        webappOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (launchBtn) {
        launchBtn.addEventListener('click', openWebAppDemo);
    }

    if (webappExitBtn) {
        webappExitBtn.addEventListener('click', closeWebAppDemo);
    }

    // Close demo on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && webappOverlay && webappOverlay.classList.contains('active')) {
            closeWebAppDemo();
        }
    });

})();
