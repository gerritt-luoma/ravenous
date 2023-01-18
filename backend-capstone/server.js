const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const errorhandler = require('errorhandler')
const morgan = require('morgan');
const apiRouter = require('./api/api');

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler());
app.use(morgan('dev'));
app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


module.exports = app;

