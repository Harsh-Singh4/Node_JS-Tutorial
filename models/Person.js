const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
   },
   userName:{
      required:true,
      type:String
   },
   passWord:{
      required:true,
      type:String
   }
});

personSchema.pre('save', async function(next){
   
   const Person =this;

   // hash the password only if it has been modified and is new

   if(!Person.isModified('passWord')){
      return next();
   }


   try{
    // hash password generation 

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(Person.passWord,salt);

    // Override the plain password with the hashed  one 
    
    Person.passWord = hashedPassword;   
    
      next();
   }
   catch(err){
     return next(err);
   }

})

personSchema.methods.comparePassword = async function(candidatePassword){
  
   try{
     const isMatch = await bcrypt.compare(candidatePassword,this.passWord);
     return isMatch;
   }
   catch(err){
      
   }

}

//Create Person Model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;
