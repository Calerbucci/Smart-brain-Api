const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const { json } = require('body-parser');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;
//initialize knex to connect to database
 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'calerbucci',
      password : 'your_database_password',
      database : 'smart-brain'
    }
  });

//initialize app
const app = express();

// midleware json
app.use(express.json());
app.use(cors())

// /signin = POST succes/fail
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

// /register  = POST = new user object
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})

// /profile/:userId  = GET = user
app.get('/profile/:id', (req,res) => { profile.handleProfile (req, res, db)})

// image = PUT  = user 
app.put('/image', (req, res) => { image.handleImage (req, res, db)})

//api call post
app.post('/imageUrl', (req, res) => { image.handleAPI(req, res)})

app.listen(PORT, ()=>{
    console.log(`App is serving on  ${PORT}`)
})

