const express=require('express');
const db = require('./db');

const app=express();

app.get('/',function(req,res){
    res.send('endpoint0');
});

app.post('/harsh',function(req,res){
    res.send('endpoint1');
})



let PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});