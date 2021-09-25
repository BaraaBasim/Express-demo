const debug = require('debug')('app:startup');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const authen = require('./authen');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views'); //default return html to user

console.log('Application Name: ' + config.get('name'));
console.log('Mail Name: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded( {extended : true} ));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use(authen);
app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development'){
app.use(morgan('tiny'));
debug('Morgan enabled');
}




// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));

