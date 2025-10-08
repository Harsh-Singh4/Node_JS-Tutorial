const express=require('express');
const db = require('./db');


const Person=require('./models/Person');
const menuItem=require('./models/Menu');


const passport=require('passport');
const localStratergy=require('passport-local').Strategy;



require('dotenv').config();

const bodyParser =require('body-parser');

const app=express();

app.use(bodyParser.json());


const logRequest = (req,res,next) =>{
    console.log(`${new Date().toLocaleString()} Request made to  :${req.originalUrl}`);
    next();
    // Move on to next phase 
}

app.use(logRequest);

passport.use(new localStratergy(async(userName,passWord,done)=>{
// Authentication logic here

   try{
      console.log("Recieved Credentials",userName,passWord);
      const user=Person.findOne({userName:userName});

      if(!user){
        return done(null,false,{message:"No such user found"});
      }
      const isPasswordMatch = user.comparePassWord(passWord);
      if(isPasswordMatch){
        return done(null,user);
      }
      else{
        return done(null,false,{message:"Incorrect Password"});
      }
   }
   catch(err){
         return done(err);
   }
}))

app.use(passport.initialize());

const localAuthMiddleWare =passport.authenticate('local',{session:false});

app.get('/',(req,res)=>{
    res.send("Welcome to our hotel");
})

// Import the routers

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
const { LocalStorageCache } = require('@auth0/auth0-react');

// Use the router

app.use('/Person',localAuthMiddleWare,personRoutes);
app.use('/menu',menuRoutes);




const PORT=3000;


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});