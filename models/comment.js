const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const commentImagepath="/uploads/comment_image";

const commentSchema = mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    email :{
        type : String,
        required :true
    },
    message :{
        type : String,
        required :true
    },
    postId :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "blog",
        required : true
    },
    comment_image :{
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
    }
});

const commentstorage=multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,"..",commentImagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

commentSchema.statics.commentuploadImage=multer({storage : commentstorage}).single('comment_image');
commentSchema.statics.commentpath=commentImagepath;


const comment=mongoose.model('comment',commentSchema);
module.exports=comment;