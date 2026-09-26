/* ============================================
   SmarTok — Landing Page Interactions
   Scroll animations, navbar, mobile menu
   ============================================ */

(function () {
    'use strict';

    /* ===== SEO 301 FALLBACK: /about-us → /#about =====
       If the server didn't already redirect, catch the stale URL
       and seamlessly navigate the user to the About section. */
    if (window.location.pathname === '/about-us' || window.location.pathname === '/about-us/') {
        window.location.replace('/#about');
        return;
    }

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

    /* ===== GLOBAL 3-LOOP LIMIT =====
       Every <video> on the page (hero promo + showcase cards + modal feed
       slides) may loop at most 3 times, then auto-pauses to save resources.
       'timeupdate'/'ended'/'play' don't bubble, so we listen in the capture
       phase — this also covers <video> elements injected dynamically. */
    (function initLoopGuard() {
        var MAX_LOOPS = 3;
        var loopState = new WeakMap(); // videoEl -> { loops, lastTime, hitLimit }

        function getState(v) {
            var s = loopState.get(v);
            if (!s) {
                s = { loops: 0, lastTime: 0, hitLimit: false };
                loopState.set(v, s);
            }
            return s;
        }

        // Looped videos never fire 'ended' — detect wrap-arounds where
        // currentTime jumps back near 0.
        document.addEventListener('timeupdate', function (e) {
            var v = e.target;
            if (!v || v.tagName !== 'VIDEO') return;
            var s = getState(v);
            if (v.currentTime < s.lastTime - 0.5) {
                s.loops += 1;
                if (s.loops >= MAX_LOOPS && !s.hitLimit) {
                    s.hitLimit = true;
                    v.pause();
                }
            }
            s.lastTime = v.currentTime;
        }, true);

        // Non-looped videos fire 'ended' — replay manually until the 3rd
        // completion, then stay paused at the end.
        document.addEventListener('ended', function (e) {
            var v = e.target;
            if (!v || v.tagName !== 'VIDEO') return;
            var s = getState(v);
            s.loops += 1;
            s.lastTime = 0;
            if (s.loops >= MAX_LOOPS) {
                s.hitLimit = true;
            } else {
                v.currentTime = 0;
                v.play().catch(function () { /* autoplay may be blocked */ });
            }
        }, true);

        // A video that hit the limit but is played again (e.g. a modal slide
        // reactivated by the user) gets a fresh 3-loop budget.
        document.addEventListener('play', function (e) {
            var v = e.target;
            if (!v || v.tagName !== 'VIDEO') return;
            var s = getState(v);
            if (s.hitLimit) {
                s.hitLimit = false;
                s.loops = 0;
                s.lastTime = 0;
            }

            // 🔇 AUTO-MUTE HERO: any other video starting playback silences the
            // hero promo so audios never overlap. The volume toggle icon is
            // re-synced to the muted-speaker state.
            var heroVideo = document.querySelector('.hero-promo-video video');
            if (heroVideo && v !== heroVideo && !heroVideo.muted) {
                heroVideo.muted = true;
                var heroToggle = document.querySelector('.hero-volume-toggle');
                if (heroToggle) {
                    heroToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
                }
            }
        }, true);
    })();

    /* ===== HERO PROMO VOLUME TOGGLE =====
       Floating mute/unmute button over the hero promo video. Swaps the
       speaker SVG between muted (X) and unmuted (waves) states. */
    (function initHeroVolumeToggle() {
        var toggle = document.querySelector('.hero-volume-toggle');
        var video = document.querySelector('.hero-promo-video video');
        if (!toggle || !video) return;

        var ICON_MUTED = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
        var ICON_VOLUME = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';

        toggle.addEventListener('click', function () {
            video.muted = !video.muted;
            toggle.innerHTML = video.muted ? ICON_MUTED : ICON_VOLUME;
            // If the user unmutes a video that already hit the 3-loop limit,
            // restart it so the interaction isn't dead.
            if (!video.muted && video.paused && video.loop) {
                video.currentTime = 0;
                video.play().catch(function () { /* ignore */ });
            }
        });
    })();

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

    /* ===== NATIVE SMARTOK VIDEO SHOWCASE ===== */

    // Store fetched video data for modal use
    var videoData = [];

    // SmarTok backend API — serves video_url (CloudFront) and thumbnail_url per video
    var SMARTOK_API = 'https://smartok-backend.onrender.com/api';

    // Cache of resolved video metadata keyed by numeric video ID
    var videoMetaCache = {};

    // Extract the numeric video ID from a SmarTok deep link.
    // Supports "?video=250-title-slug" (ID first), "?video=title-slug-250"
    // (ID last) and the masked path form "/video/250-title-slug".
    function extractSmarTokVideoId(url) {
        if (!url || typeof url !== 'string') return null;
        var match = url.match(/[?&]video=([^&#]+)/) || url.match(/\/video\/([^?&#\/]+)/);
        if (!match) return null;
        var raw = decodeURIComponent(match[1]);
        var segments = raw.split('-').filter(function (s) { return s !== ''; });
        if (segments.length === 0) return null;
        if (/^\d+$/.test(segments[0])) return segments[0];
        var last = segments[segments.length - 1];
        if (/^\d+$/.test(last)) return last;
        return null;
    }

    // Fetch video metadata (video_url, thumbnail_url, ...) from the backend. Cached per ID.
    function fetchSmarTokVideoMeta(videoId) {
        if (videoMetaCache[videoId]) return Promise.resolve(videoMetaCache[videoId]);
        return fetch(SMARTOK_API + '/videos/' + videoId)
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success && data.video) {
                    videoMetaCache[videoId] = data.video;
                    return data.video;
                }
                return null;
            })
            .catch(function (err) {
                console.warn('[SmarTok Videos] Metadata fetch failed for video', videoId, err);
                return null;
            });
    }

    // Update a <video> element's orientation attribute once real dimensions are known
    function bindOrientationDetection(videoEl) {
        videoEl.addEventListener('loadedmetadata', function () {
            var orientation = (videoEl.videoWidth && videoEl.videoHeight && videoEl.videoWidth >= videoEl.videoHeight)
                ? 'horizontal'
                : 'vertical';
            videoEl.setAttribute('data-orientation', orientation);
        });
    }

    function loadSmarTokVideos() {
        var container = document.getElementById('videos-container');
        if (!container) return;

        fetch('videos.json')
            .then(function (response) {
                if (!response.ok) throw new Error('Failed to load videos.json');
                return response.json();
            })
            .then(function (videos) {
                if (!videos || videos.length === 0) {
                    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;">' + (window.SmarTokI18n ? SmarTokI18n.t('videos.comingSoon') : 'Videos coming soon.') + '</p>';
                    return;
                }

                // Store for modal use
                videoData = videos;

                container.innerHTML = '';
                videos.forEach(function (video, index) {
                    var card = document.createElement('div');
                    card.className = 'video-card reveal';
                    card.setAttribute('data-video-index', index);

                    var videoId = extractSmarTokVideoId(video.url);
                    if (videoId) card.setAttribute('data-smartok-id', videoId);

                    // Native video preview — poster only, no playback on the grid
                    var videoEl = document.createElement('video');
                    videoEl.setAttribute('preload', 'none');
                    videoEl.setAttribute('playsinline', '');
                    videoEl.setAttribute('muted', '');
                    videoEl.setAttribute('title', video.title || 'SmarTok Video');
                    card.appendChild(videoEl);

                    // Resolve metadata — card shows the CloudFront thumbnail once fetched
                    if (videoId) {
                        fetchSmarTokVideoMeta(videoId).then(function (meta) {
                            if (!meta) return;
                            videoData[index].meta = meta;
                            if (meta.thumbnail_url) videoEl.poster = meta.thumbnail_url;
                            if (meta.video_url) videoEl.setAttribute('data-video-url', meta.video_url);
                        });
                    }

                    // Invisible overlay to intercept clicks before the video element can
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
                console.error('[SmarTok Videos] Error loading videos:', err);
                container.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;">' + (window.SmarTokI18n ? SmarTokI18n.t('videos.loadError') : 'Unable to load videos at this time.') + '</p>';
            });
    }

    loadSmarTokVideos();

    /* ===== VIDEO FEED MODAL ===== */
    var videoModal = document.getElementById('video-modal');
    var videoModalFeed = document.getElementById('video-modal-feed');
    var videoModalClose = document.getElementById('video-modal-close');
    var videoModalObserver = null;

    // Activate a slide's <video>: lazily resolve the CloudFront URL, bind src, and play
    function activateVideoSlide(slide) {
        var videoEl = slide.querySelector('video');
        if (!videoEl) return;

        function startPlayback() {
            if (!videoEl.src) return;
            videoEl.muted = false;
            var playPromise = videoEl.play();
            if (playPromise && playPromise.catch) {
                // Autoplay-with-sound may be blocked — fall back to muted playback
                playPromise.catch(function () {
                    videoEl.muted = true;
                    videoEl.play().catch(function () { /* ignore */ });
                });
            }
        }

        // Already bound — just resume
        if (videoEl.getAttribute('src')) {
            startPlayback();
            return;
        }

        // Resolve metadata: use cached entry first, otherwise fetch by video ID
        var slideIndex = parseInt(slide.getAttribute('data-slide-index'), 10);
        var entry = videoData[slideIndex];
        var videoId = slide.getAttribute('data-smartok-id');
        var metaPromise = (entry && entry.meta)
            ? Promise.resolve(entry.meta)
            : (videoId ? fetchSmarTokVideoMeta(videoId) : Promise.resolve(null));

        metaPromise.then(function (meta) {
            if (!meta || !meta.video_url) {
                console.warn('[SmarTok Videos] No playable source for slide', slideIndex);
                return;
            }
            if (entry && !entry.meta) entry.meta = meta;
            if (meta.thumbnail_url) videoEl.poster = meta.thumbnail_url;
            videoEl.src = meta.video_url;
            startPlayback();
        });
    }

    // Deactivate a slide's <video>: pause playback (keeps buffer for instant resume)
    function deactivateVideoSlide(slide) {
        var videoEl = slide.querySelector('video');
        if (!videoEl) return;
        videoEl.pause();
    }

    function openVideoModal(clickedIndex) {
        if (!videoData || videoData.length === 0) return;

        // Build modal feed slides — <video> elements start without src (lazy-load on activate)
        videoModalFeed.innerHTML = '';
        videoData.forEach(function (video, index) {
            var slide = document.createElement('div');
            slide.className = 'video-modal-slide';
            slide.setAttribute('data-slide-index', index);

            var videoId = extractSmarTokVideoId(video.url);
            if (videoId) slide.setAttribute('data-smartok-id', videoId);

            var videoEl = document.createElement('video');
            videoEl.setAttribute('playsinline', '');
            videoEl.setAttribute('loop', '');
            videoEl.setAttribute('muted', '');
            videoEl.setAttribute('preload', 'none');
            videoEl.setAttribute('data-orientation', 'vertical'); // SmarTok videos are 9:16
            videoEl.title = video.title || 'SmarTok Video';
            bindOrientationDetection(videoEl);

            // If the grid card already resolved the thumbnail, show it immediately
            if (video.meta && video.meta.thumbnail_url) videoEl.poster = video.meta.thumbnail_url;

            slide.appendChild(videoEl);

            // Transparent overlay on top of the video to capture touch/swipe gestures on mobile
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

        var videos = videoModalFeed.querySelectorAll('video');
        videos.forEach(function (videoEl) {
            videoEl.pause();
            videoEl.removeAttribute('src');
            videoEl.load();
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

    /* ===== I18N: REFRESH DYNAMIC CONTENT ON LANGUAGE CHANGE ===== */
    document.addEventListener('smartok:languagechange', function () {
        var container = document.getElementById('videos-container');
        if (container && (!videoData || videoData.length === 0)) {
            loadSmarTokVideos();
        }
    });

    /* ===== WEB APP DEMO OVERLAY ===== */
    var launchBtn = document.getElementById('launch-webapp-btn');
    var webappOverlay = document.getElementById('webapp-overlay');
    var webappIframe = document.getElementById('webapp-iframe');
    var webappExitBtn = document.getElementById('webapp-exit-btn');
    var WEBAPP_URL = 'https://smart.smartok.app';

    function openWebAppDemo() {
        if (!webappOverlay || !webappIframe) return;

        // Close mobile menu if it's open
        if (navToggle) navToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');

        webappIframe.src = WEBAPP_URL;
        webappOverlay.classList.add('active');
        webappOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus the exit button for accessibility
        if (webappExitBtn) {
            setTimeout(function () { webappExitBtn.focus(); }, 100);
        }
    }

    function closeWebAppDemo() {
        if (!webappOverlay || !webappIframe) return;
        webappIframe.src = '';
        webappOverlay.classList.remove('active');
        webappOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Restore focus to the launch button
        if (launchBtn) launchBtn.focus();
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
