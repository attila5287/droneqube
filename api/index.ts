import type { VercelRequest, VercelResponse } from '@vercel/node';
import { renderFile } from 'ejs';
import { join } from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const filePath = join(process.cwd(), 'views/pages', 'index.ejs');

    // Data to pass to the EJS template
    const data = {
        title: 'DroneQube',
        appName: 'DroneQube App'
    };

    try {
        // Render the EJS template
        const html = await renderFile(filePath, data);
        // Send the rendered HTML as the response
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    } catch (error) {
        console.error('Error rendering EJS:', error);
        res.status(500).send('Internal Server Error');
    }
}