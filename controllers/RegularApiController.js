// controllers/htmlController.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../helper/googlePublicKeyHelper'); // Adjust the path accordingly


router.get('/', async (req, res) => {
    // Extract the payload from the POST request
  
    const token = req.cookies.Token;
    try {
      // Use await to handle asynchronous operation
      const decoded = await verifyToken(token);
  
      // Generate HTML response with the payload
      const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Node.js POST HTML Response</title>
        </head>
        <body>
          <h1>Other APIs able to verify the token</h1>
          <pre>${JSON.stringify(decoded, null, 2)}</pre>
        </body>
        </html>
      `;
  
      // Set the Content-Type header to 'text/html'
      res.setHeader('Content-Type', 'text/html');
  
      res.send(htmlResponse);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: error });
    }
  });

module.exports = router;
