/*
    main
    ----
*/

//fetch works from api and generate galleries
const getWorks = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

generateGalleries(getWorks);

//call filters functions
allFilter(getWorks);
objectFilter(getWorks);
appartmentFilter(getWorks);
hotelFilter(getWorks);


//toggle admin acces
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
        }
    });
});
        

/*
    functions
    ---------
*/

//generate galleries
function generateGalleries (gallery) {
    //index gallery
    const indexGallery = document.querySelector('.gallery');
    indexGallery.innerHTML = '';

    //modal gallery
    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.innerHTML = '';

    //iterate gallery
    for (let i = 0; i < gallery.length; i++) {
        //index
        const indexFigure = document.createElement('figure');
        indexFigure.id = `indexFigure-${gallery[i].id}`;
        
        const indexImage = document.createElement('img');
        indexImage.src = gallery[i].imageUrl;

        const indexCaption = document.createElement('figcaption');
        indexCaption.innerText = gallery[i].title;

        indexGallery.appendChild(indexFigure);
        indexFigure.appendChild(indexImage);
        indexFigure.appendChild(indexCaption);

        //modal
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

//filters action and style

//display all
function allFilter (request) {
    const allFilter = document.querySelector('.filter-all');
    allFilter.addEventListener('click', () => {
    const filteredGallery = request.filter((gallery) => gallery);
    filtersColor(allFilter);
    generateGalleries(filteredGallery);
    });
}

// display 'objects'
function objectFilter (request) {
    const objectFilter = document.querySelector('.filter-object');
    objectFilter.addEventListener('click', () => {
    const filteredGallery = request.filter((gallery) => gallery.categoryId == 1);
    filtersColor(objectFilter);
    generateGalleries(filteredGallery);
    });
}

// display 'appartment'
function appartmentFilter (request) {
    const appartmentFilter = document.querySelector('.filter-appartment');
    appartmentFilter.addEventListener('click', () => {
    const filteredGallery = request.filter((gallery) => gallery.categoryId == 2);
    filtersColor(appartmentFilter);
    generateGalleries(filteredGallery);
    });
}

// display 'hotel & restaurant'
function hotelFilter (request) {
    const hotelFilter = document.querySelector('.filter-hotel');
    hotelFilter.addEventListener('click', () => {
    const filteredGallery = request.filter((gallery) => gallery.categoryId == 3);
    filtersColor(hotelFilter);
    generateGalleries(filteredGallery);
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