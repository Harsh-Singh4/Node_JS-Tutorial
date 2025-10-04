const express = require('express');
const router = express.Router();
const menuItem = require('../models/Menu');


router.post('/',async(req,res)=>{
    const data =req.body;
    const newItem = new menuItem();

    newItem.name=data.name;
    newItem.price=data.price;
    newItem.taste=data.taste;

    try{
        const data= await newItem.save();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log("error getting menu item");
        res.status(500),json({error: "Internla server error"});
    }
})



router.get('/',async(req,res)=>{
 try{
    const data = await menuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
 }
 catch(err){
    console.log("error getting menu item");
    res.status(500).json({error:"intenral server error"});
 }
})


router.get('/:t',async(req,res)=>{
   try{ const t= req.params.t;

    if(t=='sour' || t=='spicy' || t=='sweet'){
          const response = await menuItem.find({taste:t});
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