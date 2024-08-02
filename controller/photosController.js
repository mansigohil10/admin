const photos=require("../models/photos");

const path=require('path');

const fs=require('fs');

module.exports.add_photos=async(req,res)=>{
    return res.render("add_photos");
}

module.exports.insertphotosdata=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    try 
    {
        var imgpath='';
        if(req.file)
        {
            imgpath = photos.recentpath+"/"+req.file.filename;
        }
        req.body.recent_image=imgpath;
        req.body.isActive=true;
        req.body.created_date=new Date().toLocaleDateString();
        req.body.updated_date=new Date().toLocaleDateString();
        let photosdata=await photos.create(req.body);
        return res.redirect("back");
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.view_photos=async(req,res)=>{
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

    let photosdata=await photos.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await photos.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();

    return res.render("view_photos",{
        photosdata : photosdata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    }); 
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await photos.findById(req.params.id);
    if(oldData.recent_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.recent_image);
       await fs.unlinkSync(fullpath);
    }
    await photos.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let photosdata = await photos.findById(req.params.id);
   
    return res.render('update_photos',{
        sddata : photosdata
    })
}

module.exports.updatephotos= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    if(req.file)
    {
        let oldphotosdata = await photos.findById(req.body.EditId);
       
        if(oldphotosdata.recent_image)
            {
                let full=path.join(__dirname,"..",oldphotosdata.recent_image);
                await fs.unlinkSync(full);
            }
            req.body.name = req.body.fname+" "+req.body.lname;
            var imagepath ='';
            imagepath = photos.photospath+"/"+req.file.filename;
            req.body.recent_image=imagepath;
    
        await photos.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_photos' ) 
    }
    else
    {
        let oldimage = await photos.findById(req.body.EditId);
        req.body.recent_image=oldimage.recent_image;
        await photos.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_photos')
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
        let activedata = await photos.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await photos.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await photos.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}

