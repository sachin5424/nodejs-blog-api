var express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser')
const cors = require('cors')
const Port = 3002

const mongoose = require('mongoose');
const mongose_port = 'mongodb://localhost:27017/blogs';

const categories_router = require('./router/categories')
const blog_router = require('./router/blog')
const user_router = require('./router/user')
// --------------- app -------------------
app.use(bodyparser.json());
app.use(cors());
app.use('/',router);
app.use('/upload/images/',express.static('upload/images/'))
app.use(bodyparser.json())
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

const categories =require('./models/categories')
const blog = require('./models/blog')
const contect =require('./models/contect')
const contect_router = require('./router/contact')


mongoose.connect(mongose_port,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
    
});

app.use('/categories',categories_router)
app.use('/blog',blog_router)
app.use('/contact',contect_router)
app.use('/user',user_router)

app.listen(Port)
