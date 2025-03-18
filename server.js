const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');
const imageurl = require('./controllers/imageurl'); 

const PORT = process.env.PORT || 3000; // Use Render's port or 3000 for local

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Important for secure connection on Render
  });


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({
  origin: 'https://pythia-btyu.onrender.com',  // Update this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
  credentials: true  // Allow credentials like cookies (if necessary)
}));

app.get('/', (req,res) => { res.send('success')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) //dependency injection- we are injecting the dependencies this handleRegister function needs
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)})  //When submit on frontend, user hits this route that updates entries and increases the count

// POST route for image URL
app.post('/imageurl', (req, res) => {imageurl.handleApiCall(req, res)}) // Pass input and res to handleApiCall function


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});