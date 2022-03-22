const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const morgan=require('morgan')


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./userRoutes')(app);

const dbURI= `mongodb+srv://Israel:olaosebikan@nodejs.qhuw4.mongodb.net/nodeJS?retryWrites=true&w=majority`;
mongoose.connect(dbURI,{ useNewUrlParser: true })
.then((result)=> app.listen(3000))
.catch((error)=> console.log('mongoose error occurred'));


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to User API"});
});
