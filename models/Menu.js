const mongoose = require('mongoose');

// Define the menu schema

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },

    price:{
        type:Number,
        required:true
    },

    taste:{
        type:String,
        required:true,
        enum:["spicy","sweet","sour"]
    }

})


const menuItem = mongoose.model('menuItem',menuSchema);

module.exports=menuItem;