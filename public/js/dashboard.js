const deleteButton = document.getElementsByClassName("deletePost")
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-delete')) {
        const id = event.target.getAttribute('data-delete');
        console.log(id);
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
    }
};
// loops are all buttons with "deleteButton" class 
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', delButtonHandler);
}