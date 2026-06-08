async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

// Map page html -> its background image (mirrors the <img class="background"> in each page)
const PAGE_BACKGROUNDS = {
    'index.html': 'images/main.webp',
    'about.html': 'images/about.png',
    'works.html': 'images/works.png',
    'production.html': 'images/production.jpg',
    'classes.html': 'images/classes.webp',
};

// Imitate adjacent pages faintly showing through the current sheets — mirrored,
// the way the reverse side of a page reads through paper in a real book.
// Left half shows the PREVIOUS page (reverse of the leaf just turned),
// right half shows the NEXT page (reverse of the leaf about to be turned).
function addBleedThrough(wrapper) {
    if (!wrapper) return;

    const make = (page, sideClass) => {
        const name = (page || '').split('/').pop();
        const src = PAGE_BACKGROUNDS[name];
        if (!src) return;
        const bleed = document.createElement('img');
        bleed.src = '/' + src;
        bleed.className = 'page-bleed ' + sideClass;
        bleed.alt = '';
        bleed.setAttribute('aria-hidden', 'true');
        wrapper.appendChild(bleed);
    };

    make(wrapper.dataset.prev, 'page-bleed--left');
    make(wrapper.dataset.next, 'page-bleed--right');
}

loadComponent('footer', '/js/footer.html').then(() => {
    const wrapper = document.querySelector('.wrapper');

    // addBleedThrough(wrapper);

    // Highlight current page
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#footer a').forEach(a => {
        const href = (a.getAttribute('href') || '').split('/').pop() || 'index.html';
        if (href === current) {
            a.innerHTML = `<span class="highlight">${a.innerHTML}</span>`;
        }
    });

    // Fill prev/next from data attrs
    if (wrapper) {
        const prev = wrapper.dataset.prev;
        const prevN = wrapper.dataset.prevN;
        const next = wrapper.dataset.next;
        const nextN = wrapper.dataset.nextN;

        const prevEl = document.querySelector('.navbar-prev');
        const nextEl = document.querySelector('.navbar-next');

        if (prevEl && prev) {
            prevEl.href = '/' + prev;
            prevEl.textContent = `← ${prevN}`;
        }
        if (nextEl && next) {
            nextEl.href = '/' + next;
            nextEl.textContent = `${nextN} →`;
        }
    }
});
