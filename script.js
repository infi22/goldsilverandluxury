/* ================================================================
   OBSIDIAN ELITE — MINIMAL SCRIPTS
   RULE 5: Zero-JavaScript Physics (CSS handles all animation)
   Only JS needed: scroll state, reveal observer, mobile toggle
   ================================================================ */

// ===== NAVBAR SCROLL STATE =====
(function () {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
})();

// ===== MOBILE NAV TOGGLE =====
(function () {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
        links.classList.toggle('active');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            links.classList.remove('active');
        });
    });
})();

// ===== SCROLL REVEAL (IntersectionObserver) =====
(function () {
    var elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Stagger based on position in grid
                var siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
                var idx = Array.prototype.indexOf.call(siblings, entry.target);
                var delay = (idx % 3) * 100;

                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(function (el) {
        observer.observe(el);
    });
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var offset = 70;
            var pos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});
