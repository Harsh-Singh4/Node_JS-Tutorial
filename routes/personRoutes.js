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

    // Save the data to database
// Save the data to database
try {
    const savedPerson = await newPerson.save();
    console.log("Data saved successfully");
    res.status(100).json(savedPerson);
} catch (err) {
    console.log("Error saving person:", err);
    res.status(500).json({ error: "Internal Server Error" });
}}
);

router.get('/',async (req,res)=>{
    
    try {
        const data =await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log("Error getting person:", err);
    res.status(500).json({ error: "Internal Server Error" });
    }
})



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


module.exports=router;