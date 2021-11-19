const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('.title').value.trim();
    const contents = document.querySelector('.content').value.trim();

    if (title && contents) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create project');
        }
    }
};

document
    .querySelector('.newPost')
    .addEventListener('click', newFormHandler);