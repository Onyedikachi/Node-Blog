const mongoose =  require('mongoose');

const express = require('express');

const expressSession =  require('express-session');

const connectMongo =  require('connect-mongo');

const bodyParser = require('body-parser');

const fileUpload =  require('express-fileupload');

const connectFlash =  require('connect-flash');

const edgeJs = require('edge.js');

// Middlewares
const auth = require('./middleware/auth');

const validateCreatePostMiddleware = require('./middleware/storePost');

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');


// Controllers
const createPostController=  require('./controllers/createPost');

const homePageController=  require('./controllers/homePage');

const storePostController=  require('./controllers/storePost');

const getPostController=  require('./controllers/getPost');

const createUserController=  require('./controllers/createUser');

const storeUserController=  require('./controllers/storeUser');

const loginController=  require('./controllers/login');

const loginUserController=  require('./controllers/loginUser');

const logoutController =  require('./controllers/logout');



const app = express();

mongoose.connect('mongodb://localhost:27017/nodejs-blog', { useNewUrlParser: true })

const mongoStore =  connectMongo(expressSession);

app.use(expressSession({
    resave: true,
    secret: 'secret',
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use('*', (req, res, next)=>{
    edgeJs.global('auth', req.session.userId);
    next();
});

app.use(fileUpload());

app.use(require('express-edge'));

app.set('views', `${__dirname}/views`);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use(connectFlash());



// app.use('/posts/new', auth);


app.get ('/', homePageController);

app.get ('/about',(req, res)=>{
    res.render('about')
})

app.get ('/contact',(req, res)=>{
    res.render('contact')
})

app.get ('/post/:id',getPostController);

app.get ('/posts/new', auth, createPostController);

app.post('/posts/store',auth, validateCreatePostMiddleware, storePostController);

app.get('/auth/register',redirectIfAuthenticated,createUserController);

app.get('/auth/login',redirectIfAuthenticated,loginController);

app.post('/users/register', redirectIfAuthenticated,storeUserController);

app.post('/users/login', redirectIfAuthenticated, loginUserController);

app.get('/auth/logout',redirectIfAuthenticated, logoutController)


app.listen(4000,()=>{
    console.log('Listening on Port 4000')
});