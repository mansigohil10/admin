const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const sliderImagepath="/uploads/slider_image";

const sliderSchema = mongoose.Schema({
    title :{
        type : String,
        required :true
    },
    link :{
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    slider_image :{
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

const sliderstorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",sliderImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

sliderSchema.statics.slideruploadImage=multer({storage : sliderstorage}).single('slider_image');
sliderSchema.statics.sliderpath=sliderImagepath;


const slider=mongoose.model('slider',sliderSchema);
module.exports=slider;