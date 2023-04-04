/*
    main
    ----
*/

// fetch works from api and generate galleries
const getWorks = await fetch('http://localhost:5678/api/works')
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
    document.querySelector('.gallery-filter').classList.add('hidden');
}

/*
    modal
    -----
*/

// open modal
const modalOpen = document.querySelector('.modal-open');
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
const modalClose = document.querySelectorAll('.modal-close');
modalClose.forEach((close) => close.addEventListener('click', () => {
    const target = modalOpen.getAttribute('href');
    const modalTarget = document.querySelector(target);
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


// submit a photo and add it to galleries
const fileContainer = document.querySelector('#file-container');
const modalFormFile = document.querySelector('#modal-form-file');
const modalFormTitle = document.querySelector('#modal-form-title');
const modalFormCategory = document.querySelector('#modal-form-category');

modalFormFile.addEventListener('change', () => {
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
        generateIndexWork(postWorksResponse);
        generateModalWork(postWorksResponse);

        alert('Photo ajoutée');
    } else {
        alert('Vous devez renseigner tous les champs');
    }
});

/*
    functions
    ---------
*/

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

// generate index gallery
function generateIndexGallery (gallery) {
    // index gallery
    const indexGallery = document.querySelector('.gallery');
    indexGallery.innerHTML = '';
    // iterate index gallery
    for (let i = 0; i < gallery.length; i++) {
        const indexFigure = document.createElement('figure');
        indexFigure.classList.add('index-figure');
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

// generate one index work
function generateIndexWork (work) {
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

// generate modal gallery
function generateModalGallery (gallery) {
     // modal gallery
    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.innerHTML = '';
    // iterate modal gallery
    for (let i = 0; i < gallery.length; i++) {
        const modalFigure = document.createElement('figure');
        modalFigure.classList.add('modal-figure');
        modalFigure.id = `modalFigure-${gallery[i].id}`;

        const modalImage = document.createElement('img');
        modalImage.src = gallery[i].imageUrl;

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
    modalDeleteWork();
}

//generate one modal work
function generateModalWork (work) {
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

    modalDeleteWork();
}

// delete work from modal
function modalDeleteWork () {
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
}