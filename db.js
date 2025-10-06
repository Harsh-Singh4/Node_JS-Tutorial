const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL =process.env.MONGO_DB_URL;

mongoose.connect(mongoURL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Database Connected.');
})

db.on('error',(err)=>{
console.error("Database Connection Error : ",err);
})

db.on('disconnected',()=>{
    console.log('Database Disconnected');
})

module.exports = db;