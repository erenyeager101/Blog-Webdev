document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const comment = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        comment: document.getElementById('comment').value
    };

    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayComments();
            document.getElementById('comment-form').reset();
        }
    });
});

function displayComments() {
    fetch('/api/comments')
    .then(response => response.json())
    .then(data => {
        const commentsSection = document.getElementById('comments-section');
        commentsSection.innerHTML = '';
        data.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <h6>${comment.name} <small>(${comment.website})</small></h6>
                <p>${comment.comment}</p>
            `;
            commentsSection.appendChild(commentDiv);
        });
    });
}

displayComments();
