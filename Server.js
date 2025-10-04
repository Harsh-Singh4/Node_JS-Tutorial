const express=require('express');
const db = require('./db');

const Person=require('./models/Person');
const menuItem=require('./models/Menu');

const bodyParser =require('body-parser');

const app=express();

app.use(bodyParser.json());


// Import the routers

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the router

app.use('/Person',personRoutes);
app.use('/menu',menuRoutes);






let PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});