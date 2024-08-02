const slider=require("../models/slider");

const path=require('path');

const fs=require('fs');

module.exports.add_slider=async(req,res)=>{
    return res.render('add_slider')
}

module.exports.insertsliderdata=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    var imgpath =''
    if(req.file)
    {
        imgpath=slider.sliderpath+"/"+req.file.filename;
    }
    req.body.slider_image=imgpath;
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let sliderdata=await slider.create(req.body) 
    return res.redirect('back');
}

module.exports.view_slider=async(req,res)=>{
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

    let sliderdata=await slider.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}},
            {"description" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await slider.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}},
            {"description" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();

    return res.render("view_slider",{
        sliderdata : sliderdata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    }); 
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await slider.findById(req.params.id);
    if(oldData.slider_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.slider_image);
       await fs.unlinkSync(fullpath);
    }
    await slider.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let sliderdata = await slider.findById(req.params.id);
   
    return res.render('update_slider',{
        sddata : sliderdata
    })
}

module.exports.updateadmin= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    if(req.file)
    {
        let oldsliderdata = await slider.findById(req.body.EditId);
       
        if(oldsliderdata.slider_image)
            {
                let full=path.join(__dirname,"..",oldsliderdata.slider_image);
                await fs.unlinkSync(full);
            }
            req.body.name = req.body.fname+" "+req.body.lname;
            var imagepath ='';
            imagepath = slider.sliderpath+"/"+req.file.filename;
            req.body.slider_image=imagepath;
    
        await slider.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_slider' ) 
    }
    else
    {
        let oldimage = await slider.findById(req.body.EditId);
        req.body.slider_image=oldimage.slider_image;
        await slider.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_slider')
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
        let activedata = await slider.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await slider.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await slider.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}

