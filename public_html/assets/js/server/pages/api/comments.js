import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const filePath = path.resolve('.', 'comments.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const comments = JSON.parse(fileData);
        res.status(200).json(comments);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
