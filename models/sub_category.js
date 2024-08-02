const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const sub_categoryImagepath="/uploads/sub_category_image";

const sub_categorySchema = mongoose.Schema({
    title :{
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    sub_category_image :{
        type : String,
        required :true
    }, 
    isActive :{
        type : Boolean,
        required : true
    },
    category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref :"category",
        required :true
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

const sub_categorystorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",sub_categoryImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

sub_categorySchema.statics.sub_categoryuploadImage=multer({storage : sub_categorystorage}).single('sub_category_image');
sub_categorySchema.statics.sub_categorypath=sub_categoryImagepath;


const sub_category=mongoose.model('sub_category',sub_categorySchema);
module.exports=sub_category;