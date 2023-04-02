/*
    main
    ----
*/

// fetch works from api and generate galleries
let getWorks = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

generateIndexGallery(getWorks);
generateModalGallery(getWorks);

//manage index filters
indexFilters();

// toggle admin acces
const logIn = document.getElementById('log-in');
logIn.addEventListener('click', () => localStorage.clear());
const editions = document.querySelectorAll('.edition');

if (window.localStorage.getItem('authentication')) {
    logIn.innerText = 'logout';
    editions.forEach((edition) => edition.classList.remove('hidden'));
    }

/*
    modal
    -----
*/

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.modal-open');
const modalClose = document.querySelectorAll('.modal-close');

const modalGallery = document.querySelector('.modalGallery');

// open modal
modalOpen.addEventListener('click', () => {
    const target = modalOpen.getAttribute('href');
    const modalTarget = document.querySelector(target);
    modalTarget.classList.remove('hidden');

    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.remove('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.add('hidden');
});

// close modal
modalClose.forEach((close) => close.addEventListener('click', () => {
    const target = modalOpen.getAttribute('href');
    const modalTarget = document.querySelector(target);
    modalTarget.classList.add('hidden');
}));

modal.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.classList.add('hidden');
    }
});

// display modal form
const addOne = document.querySelector('.add-one-button');

addOne.addEventListener('click', () => {
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

// delete from modal
const deleteOne = document.querySelectorAll('.fa-trash');

deleteOne.forEach((button) => {
    button.addEventListener('click', async (e) => {
        const modalFigure = e.currentTarget.parentElement;
        const figureId = modalFigure.id.split('-')[1]
        const indexFigure = document.getElementById(`indexFigure-${figureId}`)
        
        const deleteWork = await fetch(`http://localhost:5678/api/works/${figureId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        });

        if (deleteWork.ok) {
            modalFigure.remove();
            indexFigure.remove();

            getWorks = await fetch('http://localhost:5678/api/works')
                                .then((response) => response.json());
        }
    });
});
        

/*
    functions
    ---------
*/

// generate index gallery
function generateIndexGallery (gallery) {
    // index gallery
    const indexGallery = document.querySelector('.gallery');
    indexGallery.innerHTML = '';
    // iterate index gallery
    for (let i = 0; i < gallery.length; i++) {
        const indexFigure = document.createElement('figure');
        indexFigure.id = `indexFigure-${gallery[i].id}`;
        
        const indexImage = document.createElement('img');
        indexImage.src = gallery[i].imageUrl;

        const indexCaption = document.createElement('figcaption');
        indexCaption.innerText = gallery[i].title;

        indexGallery.appendChild(indexFigure);
        indexFigure.appendChild(indexImage);
        indexFigure.appendChild(indexCaption);

    }
}

// generate modal gallery
    function generateModalGallery (gallery) {
     // modal gallery
    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.innerHTML = '';
    // iterate modal gallery
    for (let i = 0; i < gallery.length; i++) {
        const modalFigure = document.createElement('figure');
        modalFigure.id = `modalFigure-${gallery[i].id}`;

        const modalImage = document.createElement('img');
        modalImage.src = gallery[i].imageUrl;

        const modalTrashIcon = document.createElement('i');
        modalTrashIcon.classList.add('fa-solid');
        modalTrashIcon.classList.add('fa-trash');

        const modalCaption = document.createElement('figcaption');
        modalCaption.innerText = 'éditer';

        modalGallery.appendChild(modalFigure);
        modalFigure.appendChild(modalImage);
        modalFigure.appendChild(modalTrashIcon);
        modalFigure.appendChild(modalCaption);
    }
}

//index filters
function indexFilters () {
    // 'display all' filter
    const allFilter = document.querySelector('.filter-all');
    allFilter.addEventListener('click', () => {
        const filteredGallery = getWorks.filter((gallery) => gallery);
        filtersColor(allFilter);
        generateIndexGallery(filteredGallery);
    });

    // 'display objects' filter
    const objectFilter = document.querySelector('.filter-object');
    objectFilter.addEventListener('click', () => {
        const filteredGallery = getWorks.filter((gallery) => gallery.categoryId == 1);
        filtersColor(objectFilter);
        generateIndexGallery(filteredGallery);
    });

    // 'display appartment' filter
    const appartmentFilter = document.querySelector('.filter-appartment');
    appartmentFilter.addEventListener('click', () => {
    const filteredGallery = getWorks.filter((gallery) => gallery.categoryId == 2);
    filtersColor(appartmentFilter);
    generateIndexGallery(filteredGallery);
    });

    // 'display hotel & restaurant' filter
    const hotelFilter = document.querySelector('.filter-hotel');
    hotelFilter.addEventListener('click', () => {
    const filteredGallery = getWorks.filter((gallery) => gallery.categoryId == 3);
    filtersColor(hotelFilter);
    generateIndexGallery(filteredGallery);
    });
}

// filters style
function filtersColor (filter) { 
    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filter.style.backgroundColor = '#1d6154';
    filter.style.color = 'white';
}