const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const recentImagepath="/uploads/recent_image";

const photosSchema = mongoose.Schema({
    title :{
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    recent_image :{
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

const photosstorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",recentImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

photosSchema.statics.recentuploadImage=multer({storage : photosstorage}).single('recent_image');
photosSchema.statics.recentpath=recentImagepath;


const photos=mongoose.model('photo',photosSchema);
module.exports=photos;