const mongoose=require('mongoose');
const path=require('path');

const categorySchema = mongoose.Schema({
    category_name :{
        type : String,
        required :true
    },
    isActive :{
        type : Boolean,
        required : true
    },
    created_date :{
        type : String,
        required :true
    },
    updated_date :{
        type : String,
        required :true
    }
});

const category=mongoose.model('category',categorySchema);
module.exports=category;