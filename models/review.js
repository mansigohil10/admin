const mongoose=require('mongoose');

const reviewSchema = mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    city :{
        type : String,
        required :true
    },
    country :{
        type : String,
        required :true
    },
    review :{
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


const review=mongoose.model('review',reviewSchema);
module.exports=review;