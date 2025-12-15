/* https://youtu.be/R846J8LJ6os?si=O9ZU_KN0WA0RWOek */
/* https://www.w3schools.com/howto/howto_js_typewriter.asp */
if (document.getElementById('french-quote')) {
    const text = "Aujourd'hui, maman est morte.";
    const element = document.getElementById('french-quote');
    const trans = document.getElementById('english-quote');
    const enterSection = document.getElementById('enter-section')
    let i = 0;

    element.classList.add('typing');

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    function playTypeSound() {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.value = 200 + Math.random() * 50;
        osc.type = 'square';

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    function playSpaceSound() {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.value = 120;
        osc.type = 'square';

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.08);
        }

    function type() {
        if(i < text.length) {
            const char = text[i];
            element.textContent += char;

        if (char === '') {
            playSpaceSound();
        } else {
            playTypeSound();
        }

        i++;

        const delay = (char === ',' || char === '.') ? 250 : 90 + Math.random() * 40;
        setTimeout(type, delay);
        } else {
            element.classList.remove('typing');
            setTimeout(() => {
                if (trans) trans.classList.add('fade-in');
            }, 800);
            setTimeout(() => {
                if(enterSection) enterSection.classList.add('fade-in');
            }, 1800);
        }
    }

    document.addEventListener('click', () => {
        audioCtx.resume();
    }, {
        once: true
    });

    setTimeout(() => {
        audioCtx.resume().then(type).catch(type);
    }, 500);

    document.addEventListener('keydown', () => {
        if (i < text.length) {
            element.textContent = text;
            element.classList.remove('typing');
            i = text.length;
            if (trans) trans.classList.add('fade-in');
            if (enterSection) enterSection.classList.add('fade-in');
        }
    }, {
        once: true
    });
}