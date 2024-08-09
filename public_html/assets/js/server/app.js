const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public_html')));

const commentsFile = path.join(__dirname, '../data/comments.json');

app.get('/api/comments', (req, res) => {
    fs.readFile(commentsFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading comments.' });
        }
        res.json({ success: true, comments: JSON.parse(data) });
    });
});

app.post('/api/comments', (req, res) => {
    const newComment = req.body;

    fs.readFile(commentsFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading comments.' });
        }

        const comments = JSON.parse(data);
        comments.push(newComment);

        fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), err => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving comment.' });
            }
            res.json({ success: true });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
