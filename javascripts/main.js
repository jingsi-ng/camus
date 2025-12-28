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

/*Bibliography Accordion*/
/*https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded*/
  const workToggles = document.querySelectorAll('.works-toggle');
  
  if (workToggles.length > 0) {
    workToggles.forEach(button => {
      button.addEventListener('click', function() {
        const entry = this.closest('.works-entry');
        const icon = this.querySelector('.toggle-icon');
        const isOpen = entry.classList.contains('open');
        
        document.querySelectorAll('.works-entry.open').forEach(item => {
          if (item !== entry) {
            item.classList.remove('open');
            const otherIcon = item.querySelector('.toggle-icon');
            if (otherIcon) otherIcon.textContent = '+';
            const otherToggle = item.querySelector('.works-toggle');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          }
        });
      
        if (isOpen) {
          entry.classList.remove('open');
          icon.textContent = '+';
          this.setAttribute('aria-expanded', 'false');
        } else {
          entry.classList.add('open');
          icon.textContent = '−';
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

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
   const dotsContainer = document.getElementById('carousel-dots');

  if (!carousel || books.length === 0) return;

  let currentIndex = 1; 
  const totalBooks = books.length;

  function init() {
    updateCarousel();
    bindEvents();
  }

  function updateCarousel() {
    books.forEach((book, index) => {
      book.classList.remove('featured', 'prev', 'next', 'hidden-left', 'hidden-right');
      
      let relativePos = index - currentIndex;
      
      if (relativePos > totalBooks / 2) {
        relativePos -= totalBooks;
      } else if (relativePos < -totalBooks / 2) {
        relativePos += totalBooks;
      }
      
      if (relativePos === 0) {
        book.classList.add('featured');
        book.setAttribute('data-index', '1');
      } else if (relativePos === -1 || (relativePos === totalBooks - 1)) {
        book.classList.add('prev');
        book.setAttribute('data-index', '0');
      } else if (relativePos === 1 || (relativePos === -(totalBooks - 1))) {
        book.classList.add('next');
        book.setAttribute('data-index', '2');
      } else if (relativePos < -1) {
        book.classList.add('hidden-left');
        book.setAttribute('data-index', '-1');
      } else {
        book.classList.add('hidden-right');
        book.setAttribute('data-index', '3');
      }
    });
    
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
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
      const carouselSection = document.querySelector('.carousel-section');
      if (!carouselSection) return;
      
      const rect = carouselSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView) return;
      
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

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToBook(index));
      });
    }

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