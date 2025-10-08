const express = require('express');
const router = express.Router();
const Person = require('../models/Person');



router.post('/',async (req,res)=>{
    const data=req.body;

    // Create new person using Mongoose model
    const newPerson = new Person();

    newPerson.name=data.name;
    newPerson.age=data.age;
    newPerson.work=data.work;
    newPerson.userName=data.userName;
    newPerson.passWord=data.passWord;

    // Save the data to database
// Save the data to database
try {
    const savedPerson = await newPerson.save();
    console.log("Data saved successfully");
    res.status(200).json(savedPerson);
} catch (err) {
    console.log("Error saving person:", err);
    res.status(500).json({ error: "Internal Server Error" });
}}
);
router.get('/', async (req, res) => {
  try {
    const { userName, passWord } = req.query;

    if (userName && passWord) {
      // If credentials are given, find matching person
      const person = await Person.findOne({ userName, passWord });
      if (!person) {
        return res.status(404).json({ error: "User not found or incorrect password" });
      }
      console.log("Single person fetched by credentials");
      return res.status(200).json(person);
    }

    // Otherwise, fetch all persons
    const data = await Person.find();
    console.log('All persons fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log("Error getting person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/:workType',async(req,res)=>{
   try{ const workType= req.params.workType;

    if(workType=='chef' || workType=='waiter' || workType=='manager'){
          const response = await Person.find({work:workType});
          console.log("Response fetched");
          res.status(200).json(response);
    }
    else{
        res.status(404).json({erorr:"Invalid Work type"});
    }

}
catch(err){
     console.log("error getting menu item");
    res.status(500).json({error:"intenral server error"});
}

})

router.put('/:id',async(req,res)=>{
    // Extract id from url parameter
   try{
    const personId= req.params.id;

    const  updatedPersonData=req.body;


     const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true
     });

     if(!response){
        return res.status(404).json({error:"person not found"});
     }
  console.log("data update");
  res.status(200).json(response);
    }
    catch(err){
         console.log("error getting menu item");
    res.status(500).json({error:"intenral server error"});
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"Person not found"});
        }
         console.log("data deleted");
  res.status(200).json({message:"Person deleted successfully"});
    
}

catch(err){
      console.log("error deleting person");
    res.status(500).json({error:"intenral server error"});
}

})

module.exports=router;