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

    function random(min,max) {
        return Math.random() * (max - min) + min;
    }

    function getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID "${id}" not found`);
        }
        return element;
    }

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

/*https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout*/
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();