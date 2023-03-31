function generateModalGallery (works) {
    const modalGallery = document.querySelector('.modal-center');
    modalGallery.innerHTML = '';

    for (let i = 0; i < works.length; i++) {
        const figureGallery = document.createElement('figure');

        const imageGallery = document.createElement('img');
        imageGallery.src = works[i].imageUrl;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid');
        deleteIcon.classList.add('fa-trash');

        const captionGallery = document.createElement('figcaption');
        captionGallery.innerText = 'éditer';

        modalGallery.appendChild(figureGallery);
        figureGallery.appendChild(imageGallery);
        figureGallery.appendChild(deleteIcon);
        figureGallery.appendChild(captionGallery);
    }
}

const request = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

/*
    manage modal display
*/

const modalLink = document.querySelector('.modal-link');
const modalClose = document.querySelectorAll('.modal-close');
const modalSection = document.querySelector('.modal');

// open modal
modalLink.addEventListener('click', () => {
    const target = modalLink.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.remove('hidden');

    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.remove('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.add('hidden');

    generateModalGallery(request);
});

// close modal
modalClose.forEach((close) => close.addEventListener('click', () => {
    const target = modalLink.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.add('hidden');
}));

modalSection.addEventListener('click', (e) => {
    if(e.target == modalSection) {
        modalSection.classList.add('hidden');
    }
});


// display modal form
const addWorkButton = document.querySelector('.add-work-button');

addWorkButton.addEventListener('click', () => {
    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.add('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.remove('hidden');
});

// back to modal gallery
const modalBack = document.querySelector('.modal-back');

modalBack.addEventListener('click', () => {
    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.remove('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.add('hidden');
});
