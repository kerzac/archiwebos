/*
    main
    ----
*/

// fetch works from api and generate galleries
let getWorks = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

generateIndexGallery(getWorks);
generateModalGallery(getWorks);

 // 'display all' filter
const displayAll = document.querySelector('.filter-all');

displayAll.addEventListener('click', () => {
    const allFilter = getWorks.filter((works) => works.categoryId);
    generateIndexGallery(allFilter);
    switchFilterStyle(displayAll)
 })

// 'display object' filter
const displayObject = document.querySelector('.filter-object');

displayObject.addEventListener('click', () => {
    const objectFilter = getWorks.filter((works) => works.categoryId == 1);
    generateIndexGallery(objectFilter);
    switchFilterStyle(displayObject);
 })

// 'display appartment' filter
const displayAppartment = document.querySelector('.filter-appartment');

displayAppartment.addEventListener('click', () => {
    const appartmentFilter = getWorks.filter((works) => works.categoryId == 2);
    generateIndexGallery(appartmentFilter);
    switchFilterStyle(displayAppartment);
 })

// 'display hotel' filter
const displayHotel = document.querySelector('.filter-hotel');

displayHotel.addEventListener('click', () => {
    const hotelFilter = getWorks.filter((works) => works.categoryId == 3);
    generateIndexGallery(hotelFilter);
    switchFilterStyle(displayHotel);
 })


// toggle admin acces
const logIn = document.getElementById('log-in');
logIn.addEventListener('click', () => localStorage.clear());

const editions = document.querySelectorAll('.edition');
if (localStorage.getItem('authentication')) {
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
const sendOne = document.querySelector('.send-one-button');

sendOne.addEventListener('click', () => {
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

// add from modal
const modalFileContainer = document.querySelector('.modal-file-container');
const modalFormFile = document.querySelector('#modal-form-file');
const fileContainer = document.querySelector('#file-container');

modalFormFile.addEventListener('change', () => {
    const file = modalFormFile.files[0];
    if (file) {
        fileContainer.classList.remove('hidden');
        fileContainer.src = URL.createObjectURL(file);
    }
})

const addOne = document.querySelector('.add-one-button');

    addOne.addEventListener('click', async (e) => {
        e.preventDefault();
        const image = document.getElementById('modal-form-file').value
        const title = document.getElementById('modal-form-title').value;
        const category = document.getElementById('modal-form-category').value

        const work = new FormData();
        work.append('image', image),
        work.append('title', title),
        work.append('category', parseInt(category))

        const postWorks = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: work
        });

        if (postWorks.ok) {
            getWorks = await fetch('http://localhost:5678/api/works')
                                .then((response) => response.json());
            
            generateIndexGallery(getWorks);
            generateModalGallery(getWorks);
        } else {
            alert('erreur');
        }
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

// switch filter style
function switchFilterStyle (filter) { 
    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filter.style.backgroundColor = '#1d6154';
    filter.style.color = 'white';
}