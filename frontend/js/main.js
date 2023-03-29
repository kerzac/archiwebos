export function generateWorks (works) {
    const galleryWork = document.querySelector('.gallery');
    galleryWork.innerHTML='';

    for (let i = 0; i < works.length; i++) {
        const figureWork = document.createElement('figure');
        const imageWork = document.createElement('img');
        imageWork.src = works[i].imageUrl;
        const captionWork = document.createElement('figcaption');
        captionWork.innerText = works[i].title;

        galleryWork.appendChild(figureWork);
        figureWork.appendChild(imageWork);
        figureWork.appendChild(captionWork);
    }
}

export function manageButtonsColor (filter) { 
    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filter.style.backgroundColor = '#1d6154';
    filter.style.color = 'white';
}