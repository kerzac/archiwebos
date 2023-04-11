import { modalDeleteWork } from "./work-delete.mjs";

export function addIndexWork (work) {
    const indexGallery = document.querySelector('.gallery');
   
    const indexFigure = document.createElement('figure');
    indexFigure.classList.add('index-figure');
    indexFigure.id = `indexFigure-${work.id}`;
    
    const indexImage = document.createElement('img');
    indexImage.src = work.imageUrl;

    const indexCaption = document.createElement('figcaption');
    indexCaption.innerText = work.title;

    indexGallery.appendChild(indexFigure);
    indexFigure.appendChild(indexImage);
    indexFigure.appendChild(indexCaption);
}
/*
    //
*/
export function addModalWork (work) {
    const modalGallery = document.querySelector('.modal-gallery');

    const modalFigure = document.createElement('figure');
    modalFigure.classList.add('modal-figure');
    modalFigure.id = `modalFigure-${work.id}`;

    const modalImage = document.createElement('img');
    modalImage.src = work.imageUrl;

    const modalTrashIcon = document.createElement('i');
    modalTrashIcon.classList.add('fa-solid');
    modalTrashIcon.classList.add('fa-trash');

    const modalArrowsIcon = document.createElement('i');
    modalArrowsIcon.classList.add('fa-solid');
    modalArrowsIcon.classList.add('fa-arrows-up-down-left-right');

    const modalCaption = document.createElement('a');
    modalCaption.innerText = 'éditer';
    modalCaption.href='#';

    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalFigure.appendChild(modalTrashIcon);
    modalFigure.appendChild(modalArrowsIcon);
    modalFigure.appendChild(modalCaption);

    // enable added work deletion
    modalTrashIcon.addEventListener('click', modalDeleteWork);
}