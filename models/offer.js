const mongoose=require('mongoose');
const path=require('path');

const offerSchema = mongoose.Schema({
    icon :{
        type : String,
        required :true
    },
    title :{
        type : String,
        required :true
    },
    content :{
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

const offer=mongoose.model('offer',offerSchema);
module.exports=offer;