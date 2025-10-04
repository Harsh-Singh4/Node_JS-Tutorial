const mongoose = require('mongoose');

// Define the person Schema

const personSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,

   },
   age:{
    type:Number,

   },
   work:{
    type:String,
    enum:['waiter','chef','manager'],
    required: true
   }
});

//Create Person Model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;
