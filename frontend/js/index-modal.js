function generateModalWorks (works) {
    const modalWork = document.querySelector('.modal-center');
    modalWork.innerHTML = '';
    modalWork.classList.add('modal-gallery')

    for (let i = 0; i < works.length; i++) {
        const figureWork = document.createElement('figure');
        const imageWork = document.createElement('img');
        imageWork.src = works[i].imageUrl;
        const captionWork = document.createElement('figcaption');
        captionWork.innerText = 'éditer';

        modalWork.appendChild(figureWork);
        figureWork.appendChild(imageWork);
        figureWork.appendChild(captionWork);
    }
}

const request = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

/*
    manage modal display
*/

const galleryModal = document.querySelector('.modal-link');
const modalSection = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

// open modal
galleryModal.addEventListener('click', () => {
    const target = galleryModal.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.remove('hidden');

    generateModalWorks(request);
});

// close modal
modalClose.addEventListener('click', () => {
    const target = galleryModal.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.add('hidden');
});

modalSection.addEventListener('click', (e) => {
    if(e.target == modalSection) {
        modalSection.classList.add('hidden');
    }
});
