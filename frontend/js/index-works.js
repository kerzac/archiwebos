function generateWorks (works) {
    const galleryWork = document.querySelector('.gallery');
    galleryWork.innerHTML = '';

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

function manageFiltersColor (filter) { 
    const filters = document.querySelectorAll('.filter');
    filters.forEach((filter) => {
        filter.style.backgroundColor = '#fffef8';
        filter.style.color = '#1d6154';
    });
    filter.style.backgroundColor = '#1d6154';
    filter.style.color = 'white';
}

/*
    fetch works from api and generate them
*/

const request = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

generateWorks(request);

/*
    create funtionnal filters
*/

// display all works
const filterAll = document.querySelector('.filter-all');
filterAll.addEventListener('click', () => {
    const filterWork = request.filter((work) => work);
    manageFiltersColor(filterAll);
    generateWorks(filterWork);
});

// display 'objects' works
const filterObject = document.querySelector('.filter-object');
filterObject.addEventListener('click', () => {
    const filterWork = request.filter((work) => work.categoryId == 1);
    manageFiltersColor(filterObject);
    generateWorks(filterWork);
});

// display 'appartment' works
const filterAppartment = document.querySelector('.filter-appartment');
filterAppartment.addEventListener('click', () => {
    const filterWork = request.filter((work) => work.categoryId == 2);
    manageFiltersColor(filterAppartment);
    generateWorks(filterWork);
});

// display 'hotel & restaurant' works
const filterHotel = document.querySelector('.filter-hotel');
filterHotel.addEventListener('click', () => {
    const filterWork = request.filter((work) => work.categoryId == 3);
    manageFiltersColor(filterHotel);
    generateWorks(filterWork);
});