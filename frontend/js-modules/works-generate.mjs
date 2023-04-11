import { modalDeleteWork } from "./work-delete.mjs";

export function generateIndexWorks (works) {
    const indexGallery = document.querySelector('.gallery');
    indexGallery.innerHTML = '';

    for (let i = 0; i < works.length; i++) {
        const indexFigure = document.createElement('figure');
        indexFigure.classList.add('index-figure');
        indexFigure.id = `indexFigure-${works[i].id}`;
        
        const indexImage = document.createElement('img');
        indexImage.src = works[i].imageUrl;

        const indexCaption = document.createElement('figcaption');
        indexCaption.innerText = works[i].title;

        indexGallery.appendChild(indexFigure);
        indexFigure.appendChild(indexImage);
        indexFigure.appendChild(indexCaption);
    }
}
/*
    //
*/
export function generateModalWorks (works) {
   const modalGallery = document.querySelector('.modal-gallery');
   modalGallery.innerHTML = '';

   for (let i = 0; i < works.length; i++) {
       const modalFigure = document.createElement('figure');
       modalFigure.classList.add('modal-figure');
       modalFigure.id = `modalFigure-${works[i].id}`;

       const modalImage = document.createElement('img');
       modalImage.src = works[i].imageUrl;

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
   }
   //enable generated works deletion
   const deleteOnes = document.querySelectorAll('.fa-trash');
    deleteOnes.forEach((button) => {
        button.addEventListener('click', modalDeleteWork);
    });
}
