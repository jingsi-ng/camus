/*https://www.bilibili.com/video/BV1Y84y1L7Nn/?spm_id_from=333.337.search-card.all.click
https://www.runoob.com/js/js-tutorial.html
https://youtu.be/hdI2bqOjy3c?si=f0VjlX_HamU2Qf8U
https://youtu.be/y17RuWkWdn8?si=PLdLtxmPAXuZltdP*/

/*https://developer.mozilla.org/en-US/docs/Glossary/IIFE
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
https://www.w3schools.com/js/js_strict.asp*/
(function() {
    'use strict';

    const CONFIG = {
        text: "Aujourd'hui, maman est morte. Ou peut-être hier.",

        typingSpeed: {
            normal: 70,
            randomVariation: 45,
            punctuation: 350,
            space: 100
        },

        revealTiming: {
            englishQuote: 1200,
            coreLayer: 2800,
            enterLayer: 4000,
            starryAwakening: 4200,
            vitals: 4500
        },

        particles: {
            count: 35,
            minSize: 1,
            maxSize: 3,
            animationDuration: { min: 15, max: 27 }
        },

        stars: {
            count: 60,
            minSize: 0.5,
            maxSize: 2.5,
            animationDuration: { min: 3, max: 6 }
        }
    };

 /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math   
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 https://www.w3schools.com/js/js_random.asp
 https://www.w3schools.com/jsref/jsref_random.asp*/
    function random(min,max) {
        return Math.random() * (max - min) + min;
    }

/*https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById*/    
    function getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID "${id}" not found`);
        }
        return element;
    }

/*https://developer.mozilla.org/en-US/docs/Web/API/Element/classList*/  
    function addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    }

    function removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    }

/*https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
https://youtu.be/nKwKmaQ1etM?si=LIHOClQSJh0xDZLj
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring*/
    function createStarField() {
        const starry = getElement('starry');
        if (!starry) return;

        const { count, minSize, maxSize, animationDuration } = CONFIG.stars;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const size = random(minSize, maxSize);
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.top = random(0, 100) + '%';
            star.style.left = random(0, 100) + '%';
            star.style.animationDelay = random(0, 4) + 's';
            star.style.animationDuration = random(animationDuration.min, animationDuration.max) + 's';

            starry.appendChild(star);
        }
    }

    function createVitalsField() {
        const vitals = getElement('vitals');
        if (!vitals) return;

        const { count, minSize, maxSize, animationDuration } = CONFIG.particles;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = random(minSize, maxSize);
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = random(0, 100) + '%';
            particle.style.animationDelay = random(0, 18) + 's';
            particle.style.animationDuration = random(animationDuration.min, animationDuration.max) + 's';

            vitals.appendChild(particle);
    }
}

/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes*/
class Typewriter {
    constructor(element, text, config) {
        this.element = element;
        this.text = text;
        this.config = config;
        this.currentIndex = 0;
        this.isSkipped = false;
    }

    getDelay(char) {
        const { normal, randomVariation, punctuation, space } = this.config.typingSpeed;

        if (char === '.' || char === ',') {
            return punctuation;
        }
        if (char === ' ') {
            return space;
        }
        return normal + random(0, randomVariation);
    }

/*https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
https://youtu.be/POX3dT-pB4E?si=FOMSiFUkq65xOqQM
https://youtu.be/2ZphE5HcQPQ?si=zSGkDvYOQo-q1O-4
https://youtu.be/sApSxcqwgd8?si=35HMedBLxJcPHRGH*/
    typeCharacter() {
        if (this.isSkipped) return;

        if (this.currentIndex < this.text.length) {
            const char = this.text[this.currentIndex];
            this.element.textContent += char;
            this.currentIndex++;

            const delay = this.getDelay(char);
            setTimeout(() => this.typeCharacter(), delay);
        } else {
            this.onComplete();
        }
    }

    onComplete() {
        removeClass(this.element, 'typing');
        revealLayers();
    }

    skip() {
        this.isSkipped = true;
        this.element.textContent = this.text;
        removeClass(this.element, 'typing');
    }

    start() {
        addClass(this.element, 'typing');
        this.typeCharacter();
    }
}

function revealLayers() {
    const { revealTiming } = CONFIG;

    const englishQuote = getElement('english-quote');
    const core = getElement('core');
    const enter = getElement('enter');
    const starry = getElement('starry');
    const vitals = getElement('vitals');

    setTimeout(() => addClass(englishQuote, 'visible'), revealTiming.englishQuote);
    setTimeout(() => addClass(core, 'visible'), revealTiming.coreLayer);
    setTimeout(() => addClass(enter, 'visible'), revealTiming.enterLayer);
    setTimeout(() => addClass(starry, 'awakening'), revealTiming.starryAwakening);
    setTimeout(() => addClass(vitals, 'visible'), revealTiming.vitals);
}

function skipToEnd(typewriter) {
    if (typewriter && !typewriter.isSkipped && typewriter.currentIndex < typewriter.text.length) {
        typewriter.skip();

        const elements = ['english-quote', 'core', 'enter', 'starry', 'vitals'];

        elements.forEach(id => {
            const element = getElement(id);
            if (id === 'starry') {
                addClass(element, 'awakening');
            } else {
                addClass(element, 'visible');
            }
        });
    } 
}

/*https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
https://developer.mozilla.org/en-US/docs/Web/API/Location/href*/
function setupPageTransition() {
    const enterLink = getElement('enter-link');
    if (!enterLink) return;
    
    enterLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.href;

        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800);
    });
}

/*https://developer.mozilla.org/en-US/docs/Web/API/console
https://developer.mozilla.org/en-US/docs/Web/API/console/error_static
https://developer.mozilla.org/en-US/docs/Web/API/console/log_static
https://developer.mozilla.org/en-US/docs/Web/API/console/warn_static*/
function init() {
    console.log('Entry Page: Initialising ...');

    createStarField();
    createVitalsField();

    const frenchQuote = getElement('french-quote');
    if (!frenchQuote) {
        console.error('Opening quote element not found');
        return;
    }

    const typewriter = new Typewriter(frenchQuote, CONFIG.text, CONFIG);

    document.addEventListener('keydown', function skipHandler() {
        skipToEnd(typewriter);
        document.removeEventListener('keydown', skipHandler);
    }, {
        once: true 
    });

    setupPageTransition();

    setTimeout(() => {
        typewriter.start();
        console.log('Typewriter: Started (silent mode)');
    }, 1200);
    console.log('Entry Page: Initialisation complete');
}

/*https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();