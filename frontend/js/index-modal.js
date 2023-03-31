function generateModalGallery (works) {
    const modalGallery = document.querySelector('.modal-center');
    modalGallery.innerHTML = '';
    modalGallery.classList.add('modal-gallery')

    for (let i = 0; i < works.length; i++) {
        const figureGallery = document.createElement('figure');
        const imageGallery = document.createElement('img');
        imageGallery.src = works[i].imageUrl;
        const captionGallery = document.createElement('figcaption');
        captionGallery.innerText = 'éditer';

        modalGallery.appendChild(figureGallery);
        figureGallery.appendChild(imageGallery);
        figureGallery.appendChild(captionGallery);
    }
}

const request = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

/*
    manage modal display
*/

const modalLink = document.querySelector('.modal-link');
const modalClose = document.querySelector('.modal-close');
const modalSection = document.querySelector('.modal');

// open modal
modalLink.addEventListener('click', () => {
    const target = modalLink.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.remove('hidden');

    generateModalGallery(request);
});

// close modal
modalClose.addEventListener('click', () => {
    const target = modalLink.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.add('hidden');
});

modalSection.addEventListener('click', (e) => {
    if(e.target == modalSection) {
        modalSection.classList.add('hidden');
    }
});
