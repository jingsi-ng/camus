/*Fade In*/
/*https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
https://www.w3schools.com/jsref/met_document_queryselectorall.asp*/
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
});

/*Scroll Reveal*/
/*https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
https://youtu.be/2IbRtjez6ag?si=Ng5090WXVIjT8O2R
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset*/
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


document.addEventListener('DOMContentLoaded', function() {

 /*Nav*/
 /*https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector*/
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

/*https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
https://developer.mozilla.org/en-US/docs/Web/CSS/:not
https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator
https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
https://youtu.be/w-SpaTBf-j0?si=HYP6fG0H1VYJwj8G
*/
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    const regularLinks = navLinks.querySelectorAll('li:not(.has-dropdown) > a');
    regularLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });

    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

/*https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth*/
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  
  dropdownItems.forEach(item => {
    const link = item.querySelector('a'); 
    
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          item.classList.toggle('open');

          dropdownItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('open');
            }
          });
        }
      });
    }
  });

 /*https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event*/ 
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
      });
    }
  });

  /*Image Lazy*/
  /*https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src
  https://youtu.be/RaIp3yomqBI?si=7EMeD-If4MhqrLxg*/
  const images = document.querySelectorAll('img[data-src]');
  
  if (images.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  /*Bio Timeline*/
  /*https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
  https://youtu.be/Q3ipHIy-YG0?si=7g1YwJvUWPKAy219
  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  https://youtu.be/SowV5KGrv1o?si=w76cbWZrmBxch5TQ*/
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
  
  /*Citation*/
  const citations = document.querySelectorAll('.citation a');
  
  citations.forEach(citation => {
    citation.addEventListener('click', function(e) {
      
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });

}); 

/*Works Carousel*/
/*https://www.w3schools.com/howto/howto_js_slideshow.asp
https://youtu.be/JX5qDzWDF4U?si=A1N9X8eQeieTeBpg
https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
https://www.w3schools.com/js/js_arithmetic.asp
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
https://youtu.be/bB8-JziGLpo?si=PktlVokbVNIHLudR
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
https://youtu.be/TaPdgj8mucI?si=8HXMnRbglmyWl9S3
https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
*/
(function() {
  'use strict';

  const carousel = document.querySelector('.carousel-books');
  const books = document.querySelectorAll('.book');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!carousel || books.length === 0) return;

  let currentIndex = 1; 
  const totalBooks = books.length;

  function init() {
    updateCarousel();
    bindEvents();
  }

  function updateCarousel() {
    books.forEach((book, index) => {
      book.classList.remove('featured', 'prev', 'next', 'hidden');
      
      const position = index - currentIndex;
      
      book.setAttribute('data-index', getVisualPosition(position));
      
      if (position === 0) {
        book.classList.add('featured');
      }
    });
  }

  function getVisualPosition(relativePosition) {
    if (relativePosition === 0) return 1; 
    if (relativePosition < 0 || relativePosition === totalBooks - 1) return 0; 
    return 2; 
  }

  function nextBook() {
    currentIndex = (currentIndex + 1) % totalBooks;
    updateCarousel();
  }

  function prevBook() {
    currentIndex = (currentIndex - 1 + totalBooks) % totalBooks;
    updateCarousel();
  }

  function goToBook(index) {
    currentIndex = index;
    updateCarousel();
  }

  function bindEvents() {
    if (prevBtn) {
      prevBtn.addEventListener('click', prevBook);
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', nextBook);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevBook();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextBook();
      }
    });

    books.forEach((book, index) => {
      book.addEventListener('click', function() {
        if (index !== currentIndex) {
          goToBook(index);
        } else {
          const link = book.querySelector('.book-detail-link');
          if (link) {
            link.click();
          }
        }
      });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextBook(); 
        } else {
          prevBook(); 
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/*Scroll Top*/
/*https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll
https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
https://youtu.be/SJVCvnKM_lI?si=KZKVCoKOKrJ4fo2Y*/
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}