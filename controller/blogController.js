const blog=require("../models/blog");

const path=require('path');

const fs=require('fs');

module.exports.add_blog=async(req,res)=>{
    return res.render("add_blog");
}

module.exports.insertblogdata=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    try 
    {
        var imgpath='';
        if(req.file)
        {
            imgpath = blog.blogpath+"/"+req.file.filename;
        }
        req.body.blog_image=imgpath;
        req.body.isActive=true;
        req.body.username=req.user.name;
        req.body.created_date=new Date().toLocaleDateString();
        req.body.updated_date=new Date().toLocaleDateString();
        let blogdata=await blog.create(req.body);
        return res.redirect("back");
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.view_blog=async(req,res)=>{
    let search='';
    if(req.query.search)
    {
        search=req.query.search;
    }

    //pagination
    if(req.query.page)
    {
        page=req.query.page;
    }
    else
    {
        page=0;
    }
    let perpage=2;

    let blogdata=await blog.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await blog.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();

    return res.render("view_blog",{
        blogdata : blogdata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    }); 
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await blog.findById(req.params.id);
    if(oldData.recent_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.recent_image);
       await fs.unlinkSync(fullpath);
    }
    await blog.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let blogdata = await blog.findById(req.params.id);
   
    return res.render('update_blog',{
        bgdata : blogdata
    })
}

module.exports.updateblog= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    if(req.file)
    {
        let oldblogdata = await blog.findById(req.body.EditId);
       
        if(oldblogdata.recent_image)
            {
                let full=path.join(__dirname,"..",oldblogdata.recent_image);
                await fs.unlinkSync(full);
            }
            req.body.name = req.body.fname+" "+req.body.lname;
            var imagepath ='';
            imagepath = blog.blogpath+"/"+req.file.filename;
            req.body.recent_image=imagepath;
    
        await blog.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_blog' ) 
    }
    else
    {
        let oldimage = await blog.findById(req.body.EditId);
        req.body.recent_image=oldimage.recent_image;
        await blog.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_blog')
    }
  }
  catch(err){
    console.log(err);
    return res.redirect("back")
  }
   
}

module.exports.setDeactive= async(req,res)=>
{
    // console.log(req.params.id);
    try{
        if(req.params.id)
    {
        let activedata = await blog.findByIdAndUpdate(req.params.id,{isActive:false});
        if(activedata)
        {
            console.log("success");
            return res.redirect("back")
        }
        else{
            console.log("record not deactive");
            return res.redirect("back")
        }
    }
    else{
        console.log("record not found");
        return res.redirect("back")
    }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.setactive= async(req,res)=>
{
    // console.log(req.params.id);
    try{
        if(req.params.id)
    {
        let activedata = await blog.findByIdAndUpdate(req.params.id,{isActive:true});
        if(activedata)
        {
            console.log("success");
            return res.redirect("back")
        }
        else{
            console.log("record not deactive");
            return res.redirect("back")
        }
    }
    else{
        console.log("record not found");
        return res.redirect("back")
    }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}


module.exports.deletemanyrecord = async(req,res)=>{
    // console.log(req.body);
    await blog.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}

