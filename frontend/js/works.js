import {generateWorks, manageButtonsColor} from './main.js';

/*
    fetch works from api and generate them
*/

const works = await fetch('http://localhost:5678/api/works')
                        .then((response) => response.json());

generateWorks(works);

/*
    create funtionnal filtering buttons
*/

// display all works
const filterAll = document.querySelector('.filter-all');
filterAll.addEventListener('click', () => {
    const filterWork = works.filter((work) => work);
    manageButtonsColor(filterAll);
    generateWorks(filterWork);
});

// display 'objects' works
const filterObject = document.querySelector('.filter-object');
filterObject.addEventListener('click', () => {
    const filterWork = works.filter((work) => work.categoryId == 1);
    manageButtonsColor(filterObject);
    generateWorks(filterWork);
});

// display 'appartment' works
const filterAppartment = document.querySelector('.filter-appartment');
filterAppartment.addEventListener('click', () => {
    const filterWork = works.filter((work) => work.categoryId == 2);
    manageButtonsColor(filterAppartment);
    generateWorks(filterWork);
});

// display 'hotel & restaurant' works
const filterHotel = document.querySelector('.filter-hotel');
filterHotel.addEventListener('click', () => {
    const filterWork = works.filter((work) => work.categoryId == 3);
    manageButtonsColor(filterHotel);
    generateWorks(filterWork);
});