import { generateIndexWorks,
        generateModalWorks,
        addIndexWork,
        addModalWork } from "./js-modules/works.mjs";

import { switchFilterStyle } from "./js-modules/filters.mjs";

/*
    main
    ----
*/

// fetch works from api and generate works
const getWorks = await fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .catch(err => console.log(err));

generateIndexWorks(getWorks);
generateModalWorks(getWorks);

 // create 'display all' filter
const filterAll = document.querySelector('.filter-all');
filterAll.addEventListener('click', () => {
    const allFilter = getWorks.filter(works => works.categoryId);
    generateIndexWorks(allFilter);
    switchFilterStyle(filterAll);
 })

// create 'display object' filter
const filterObject = document.querySelector('.filter-object');
filterObject.addEventListener('click', () => {
    const objectFilter = getWorks.filter(works => works.categoryId == 1);
    generateIndexWorks(objectFilter);
    switchFilterStyle(filterObject);
 })

// create 'display appartment' filter
const filterAppartment = document.querySelector('.filter-appartment');
filterAppartment.addEventListener('click', () => {
    const appartmentFilter = getWorks.filter(works => works.categoryId == 2);
    generateIndexWorks(appartmentFilter);
    switchFilterStyle(filterAppartment);
 })

// create 'display hotel' filter
const filterHotel = document.querySelector('.filter-hotel');
filterHotel.addEventListener('click', () => {
    const hotelFilter = getWorks.filter(works => works.categoryId == 3);
    generateIndexWorks(hotelFilter);
    switchFilterStyle(filterHotel);
 })


// toggle admin acces
const logIn = document.getElementById('log-in');
logIn.addEventListener('click', () => localStorage.clear());

const editions = document.querySelectorAll('.edition');
if (localStorage.getItem('authentication')) {
    logIn.innerText = 'logout';
    editions.forEach(edition => edition.classList.remove('hidden'));
    document.querySelector('.gallery-filter').classList.add('hidden');
}

/*
    modal
    -----
*/

// open modal
const modalOpen = document.querySelector('.modal-open');
modalOpen.addEventListener('click', () => {
    const modalTarget = document.getElementById('portfolio-modal');
    modalTarget.classList.remove('hidden');

    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.remove('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.add('hidden');
});

// close modal
const modalClose = document.querySelectorAll('.modal-close');
modalClose.forEach(close => close.addEventListener('click', () => {
    const modalTarget = document.getElementById('portfolio-modal');
    modalTarget.classList.add('hidden');
}));

const modal = document.querySelector('.modal');
modal.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.classList.add('hidden');
    }
});

// display modal form
const addPhotoButton = document.querySelector('.add-photo-button');
addPhotoButton.addEventListener('click', () => {
    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.add('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.remove('hidden');
});

// return back from modal form
const modalBack = document.querySelector('.modal-back');
modalBack.addEventListener('click', () => {
    const modalContainerGallery = document.querySelector('.modal-container-gallery');
    modalContainerGallery.classList.remove('hidden');
    const modalContainerForm = document.querySelector('.modal-container-form');
    modalContainerForm.classList.add('hidden');
});


// submit a photo and add it to portfolio
const modalFormFile = document.querySelector('#modal-form-file');
const modalFormTitle = document.querySelector('#modal-form-title');
const modalFormCategory = document.querySelector('#modal-form-category');

modalFormFile.addEventListener('change', () => {
    const fileContainer = document.querySelector('#file-container');
    const file = modalFormFile.files[0];
    if (file) {
        fileContainer.classList.remove('hidden');
        fileContainer.src = URL.createObjectURL(file);
    } else if (!file)
        fileContainer.classList.add('hidden');
});

const submitPhotoButton = document.querySelector('.submit-photo-button');
submitPhotoButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const image = modalFormFile.files[0];
    const title = modalFormTitle.value;
    const category = parseInt(modalFormCategory.value);

    const work = new FormData();
    work.append('image', image),
    work.append('title', title),
    work.append('category', category);

    const postWorks = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: work
    });

    const postWorksResponse = await postWorks.json()
    
    if (postWorks.ok) {
        addIndexWork(postWorksResponse);
        addModalWork(postWorksResponse);

        document.querySelector('.submit-feedback').style.display = 'inline';
        setTimeout(() => document.querySelector('.submit-feedback').style.display = 'none', 5000)   
        
    } else {
        document.querySelector('.modal-form-feedback').style.display = 'inline';
        setTimeout(() => document.querySelector('.modal-form-feedback').style.display = 'none', 5000)
    }
});

// enable submit button
submitPhotoButton.disabled = true;

modalFormTitle.addEventListener('keyup', () => {
    if (modalFormTitle.value.length > 0) {
        submitPhotoButton.disabled = false;
    } else {
        submitPhotoButton.disabled = true;
    }
});