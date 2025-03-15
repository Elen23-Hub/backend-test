const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'Eleni',
      port: '5432',
      password: '',
      database: 'smartbraindb',
    },
  });


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => { res.send('success')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) //dependency injection- we are injecting the dependencies this handleRegister function needs
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)})  //When submit on frontend, user hits this route that updates entries and increases the count


app.listen(3000, () => {
    console.log('app is running on port 3000')
})
