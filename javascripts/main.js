if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-scroll-reveal]').forEach(el => observer.observe(el));
}

const progressBar = document.getElementById('progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const h = documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / h) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
}

const menuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
    });

    document.addEventListener('click', e => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

document.body.classList.add('fade-in');

document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && link.target !== '_blank' && !link.href.includes('#')) {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => window.location.href = link.href, 300);
    });
    }
});

const timeline = document.getElementById('timeline');
if (timeline) {
    let active = null;

    timeline.querySelectorAll('.timeline-event').forEach(event => {
        event.addEventListener('click', () => {
            const detail = event.querySelector('.event-detail');

            if (active && active !== event) {
                active.classList.remove('active');
                active.querySelector('.event-detail').style.maxHeight = '0';
            }
            
                if(event.classList.contains('active')) {
                    event.classList.remove('active');
                    detail.style.maxHeight = '0';
                    active = null;
                } else {
                    event.classList.add('active');
                    detail.style.maxHeight = detail.scrollHeight + 'px';
                    active = event;

                    setTimeout(() => event.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    }), 100);
                }
            });
        });
    }