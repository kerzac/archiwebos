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
   deleteModalWork();
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

    deleteModalWork();
}
/*
    //
*/
function deleteModalWork () {
    const deleteOne = document.querySelectorAll('.fa-trash');

    deleteOne.forEach((button) => {
        button.addEventListener('click', async (e) => {
            const modalFigure = e.currentTarget.parentElement;
            const figureId = modalFigure.id.split('-')[1];
            const indexFigure = document.getElementById(`indexFigure-${figureId}`);
            
            const deleteWork = await fetch(`http://localhost:5678/api/works/${figureId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            });

            if (deleteWork.ok) {
                modalFigure.remove();
                indexFigure.remove();
            }
        });
    });
}