const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const adminImagepath="/uploads/admin_image";

const AdminSchema = mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    email :{
        type : String,
        required :true
    },
    password :{
        type : String,
        required :true
    },
    gender :{
        type : String,
        required :true
    },
    hobby :{
        type : Array,
        required :true
    },
    city :{
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    admin_image :{
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

const Adminstorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",adminImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

AdminSchema.statics.AdminuploadImage=multer({storage : Adminstorage}).single('admin_image');
AdminSchema.statics.adminpath=adminImagepath;


const Admin=mongoose.model('Admin',AdminSchema);
module.exports=Admin;