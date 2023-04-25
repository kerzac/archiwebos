export async function modalDeleteWork (e) {
    const modalFigure = e.currentTarget.parentElement;
    const figureId = modalFigure.id.split('-')[1];
    const indexFigure = document.getElementById(`indexFigure-${figureId}`);
    
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
}