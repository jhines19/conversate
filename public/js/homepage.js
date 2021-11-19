// create a new comment
// get all buttons for for loop
const buttons = document.getElementsByClassName("postCommentButton")
const newFormHandler = async (event) => {
    event.preventDefault();
    const post_id = parseInt(event.target.getAttribute('data-id'))  // post_id is id of post
    const comment_contents = document.querySelector(`.class${post_id}`).value;
    if (comment_contents && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_contents, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment.');
        }
    }
};
// loops are all buttons with "postCommentButton" class 
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', newFormHandler);
}