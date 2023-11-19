const express = require('express');
const bodyParser = require('body-parser');
const loginPageController = require('./controllers/loginPageController');
const callBackController = require('./controllers/callBackController');
const RegularApiController = require('./controllers/RegularApiController');
const cookieParser = require('cookie-parser');


const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', loginPageController);
app.use('/api', callBackController);
app.use('/details', RegularApiController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
