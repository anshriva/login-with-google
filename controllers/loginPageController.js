// controllers/htmlController.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const htmlResponse = `
    <html>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <body>
        <div id="g_id_onload"
            data-client_id="97133589647-rdt7v2rcpujtsk4ldbcanlb85vb1dffg.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:8080/api/data-callback"
            data-auto_prompt="false">
        </div>
        <div class="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="filled_blue"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
        </div>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(htmlResponse);
});

module.exports = router;
