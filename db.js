const mongoose = require('mongoose');

const mongoURL ='mongodb://localhost:27017/hotels';

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