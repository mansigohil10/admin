const slider=require('../models/slider');

const offer=require('../models/offer');

const review=require("../models/review");

const photos=require("../models/photos");

const blog=require("../models/blog");

const comment=require("../models/comment");

const category=require("../models/category");

const sub_category=require("../models/sub_category");

const contact=require("../models/contact");

const path=require('path');

const nodemailer=require('nodemailer');

module.exports.start = async(req,res)=>{
    let sliderdata = await slider.find({});
    let offerdata = await offer.find({});
    let reviewdata = await review.find({});
    let photosdata =await photos.find({});
    let blogdata=await blog.find({});
    let categorydata=await category.find({});
    return res.render('userpanel/home',{
        "sliderdata" : sliderdata,
        "offerdata" : offerdata,
        "reviewdata" : reviewdata,
        "recentphotos" : photosdata,
        "blogdata" : blogdata,
        "category" : categorydata

    })
}

module.exports.blog_single=async(req,res)=>{
    let blogsingledata=await blog.findById(req.params.id);
    let commentpost=await comment.find({postId:req.params.id});
    let allblogdata=await blog.find({});
    let recentpost = await blog.find({}).sort({_id:-1}).limit(3);

    var ids=[];
    allblogdata.map((v,i)=>{
        ids.push(v.id);
    });

    var next;
    for(var i=0;i<ids.length;i++){
        if(ids[i]==req.params.id){
            next=i;
            break;
        }
    }

    return res.render("userpanel/blog_single",{
        blogdt : blogsingledata, 
        postId:req.params.id,
        totalcomment:commentpost.length,
        cp : commentpost,
        Allids : ids,
        np : next,
        recentpost : recentpost
    })
}

module.exports.addcomment=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    var imgpath='';
    if(req.file)
    {
        imgpath = comment.commentpath+"/"+req.file.filename;
    }
    req.body.comment_image=imgpath;
    req.body.isActive=false;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let commentData = await comment.create(req.body);
    return res.redirect("back")
}

module.exports.work_three=async(req,res)=>{
    let catdData = await category.find({});
    let subData = await sub_category.find({});
    return res.render("userpanel/work_three",{
        catdData : catdData,
        subData : subData
    })
}

module.exports.contact=async(req,res)=>{
    return res.render("userpanel/contact");
}

module.exports.insertcontactdata=async(req,res)=>{
    try {
        // console.log(req.body)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "mansigohil2003@gmail.com",
                pass: "lqrqjcsxrbdcnyrx",
            },
        });


        const info = await transporter.sendMail({
            from: 'mansigohil2003@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ", // Subject line
            html:`<p>welcome to the site</p>
            <p>your responde is sent</p>`
           
        });

        if (info) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString()
            await contact.create(req.body)
            return res.redirect('back')
        }
        else {
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}