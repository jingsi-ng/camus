/*Scroll Reveal*/
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
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

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

  const dropdownItems = document.querySelectorAll('.has-dropdown');
  
  dropdownItems.forEach(item => {
    const link = item.querySelector('a'); 
    
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 1023) {
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

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1023) {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
      });
    }
  });

  /*Image Lazy*/
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