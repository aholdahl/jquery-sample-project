const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;
let app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }))
const sampleRouter = require('./routes/sample.router.js');

app.use('/hello', sampleRouter);

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
});