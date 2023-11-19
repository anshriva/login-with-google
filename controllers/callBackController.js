// controllers/postController.js
const express = require('express');
const { verifyToken } = require('../helper/googlePublicKeyHelper'); // Adjust the path accordingly
const router = express.Router();

router.post('/data-callback', async (req, res) => {
  // Extract the payload from the POST request
  const payload = req.body;

  try {
    // Use await to handle asynchronous operation
    const decoded = await verifyToken(payload.credential);

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
        <h1>POST Request Payload:</h1>
        <pre>${JSON.stringify(decoded, null, 2)}</pre>
      </body>
      </html>
    `;

    // Set the Content-Type header to 'text/html'
    res.setHeader('Content-Type', 'text/html');

    // Set the JWT token as a cookie with HttpOnly attribute
    res.setHeader('Set-Cookie', `Token=${payload.credential}; Path=/; HttpOnly`);

    // Send the HTML response with the payload
    res.send(htmlResponse);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error });
  }
});

module.exports = router;
