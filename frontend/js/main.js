/*
    fetch works from api and generate them
*/

const works =  await fetch('http://localhost:5678/api/works')
                    .then((response) => response.json());

function generateWorks (works) {
    for (let i = 0; i < works.length; i++) {
        const galleryWork = document.querySelector('.gallery');

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

generateWorks(works);

/*
    create funtionnal filtering buttons
*/

const filterAll = document.querySelector('.filter-all');
const filterObject = document.querySelector('.filter-object');
const filterAppartment = document.querySelector('.filter-appartment');
const filterHotel = document.querySelector('.filter-hotel');

// display all works
filterAll.addEventListener('click', () => {
    const filterWork = works.filter((work) => work);

    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filterAll.style.backgroundColor = '#1d6154';
    filterAll.style.color = 'white';

    const galleryWork = document.querySelector('.gallery');
    galleryWork.innerHTML='';
    generateWorks(filterWork);
});

// display 'objects' works
filterObject.addEventListener('click', () => {
    const filterWork = works.filter((work) => work.categoryId == 1);

    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filterObject.style.backgroundColor = '#1d6154';
    filterObject.style.color = 'white';

    const galleryWork = document.querySelector('.gallery');
    galleryWork.innerHTML='';
    generateWorks(filterWork);
});

// display 'appartment' works
filterAppartment.addEventListener('click', () => {
    const filterWork = works.filter((work) => work.categoryId == 2);

    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filterAppartment.style.backgroundColor = '#1d6154';
    filterAppartment.style.color = 'white';

    const galleryWork = document.querySelector('.gallery');
    galleryWork.innerHTML='';
    generateWorks(filterWork);
});

// display 'hotel & restaurant' works
filterHotel.addEventListener('click', () => {
    const filterWork = works.filter((work) => work.categoryId == 3);

    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filterHotel.style.backgroundColor = '#1d6154';
    filterHotel.style.color = 'white';

    const galleryWork = document.querySelector('.gallery');
    galleryWork.innerHTML='';
    generateWorks(filterWork);
});