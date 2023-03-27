const works =  await fetch('http://localhost:5678/api/works')
                    .then((response) => response.json())

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