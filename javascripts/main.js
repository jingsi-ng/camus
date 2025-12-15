/* https://youtu.be/R846J8LJ6os?si=O9ZU_KN0WA0RWOek */
/* https://www.w3schools.com/howto/howto_js_typewriter.asp */
if (document.getElementById('french-quote')) {
    const text = "Aujourd'hui, maman est morte.";
    const element = document.getElementById('french-quote');
    let i = 0;

    element.classList.add('typing');

    function type() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(type, 90 + Math.random() * 40);
        } else {
            element.classList.remove('typing');
            setTimeout(() => {
                const trans = document.getElementById('english-quote');
                if (trans) trans.classList.add('fade-in')
            }, 800);
        }
    }

    setTimeout(type, 500);
}