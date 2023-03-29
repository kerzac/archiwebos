import {generateWorks, manageFiltersColor} from './main.js';

/*
    fetch works from api and generate them
*/

const request = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

generateWorks(request);

/*
    create funtionnal filtering buttons
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