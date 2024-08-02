const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const blogImagepath="/uploads/blog_image";

const blogSchema = mongoose.Schema({
    title :{
        type : String,
        required :true
    },
    description :{
        type : String,
        required :true
    },
    category :{
        type : String,
        required :true
    },
    username :{
        type : String,
        required :true
    },
    blog_image :{
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

const blogstorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",blogImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

blogSchema.statics.bloguploadImage=multer({storage : blogstorage}).single('blog_image');
blogSchema.statics.blogpath=blogImagepath;


const blog=mongoose.model('blog',blogSchema);
module.exports=blog;