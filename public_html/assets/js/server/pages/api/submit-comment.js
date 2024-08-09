import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, website, comment } = req.body;
        const newComment = { name, email, website, comment, date: new Date() };

        const filePath = path.resolve('.', 'comments.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const comments = JSON.parse(fileData);
        comments.push(newComment);

        fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
        res.status(201).json(newComment);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
