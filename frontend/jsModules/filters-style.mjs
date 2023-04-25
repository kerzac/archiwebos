export function switchFilterStyle (filter) { 
    const filters = document.querySelectorAll('.filter');
    filters.forEach((f) => {
        f.style.backgroundColor = '#fffef8';
        f.style.color = '#1d6154';
    });
    filter.style.backgroundColor = '#1d6154';
    filter.style.color = 'white';
}