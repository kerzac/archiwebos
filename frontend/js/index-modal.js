/*
    manage modal display
*/

const galleryModal = document.querySelector('.modal-gallery');
const modalSection = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

// open modal
galleryModal.addEventListener('click', () => {
    const target = galleryModal.getAttribute('href');
    const modal = document.querySelector(target);
    modal.classList.remove('hidden');
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
