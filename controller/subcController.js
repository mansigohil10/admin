const sub_category=require("../models/sub_category");

const category=require("../models/category");

const path=require('path');

const fs=require('fs');

module.exports.add_sub_category=async(req,res)=>{
    // console.log(req.body);
    let categorys=await category.find({});
    return res.render("add_subcategory",
    {
        catrecord : categorys
    })
}

module.exports.insertsub_category_data=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
   
    var imgpath =''
    if(req.file)
    {
        imgpath= sub_category.sub_categorypath+"/"+req.file.filename;
    }
    req.body.sub_category_image=imgpath;
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let sub_categorydata=await sub_category.create(req.body);
    return res.redirect("back")
}

module.exports.view_sub_category=async(req,res)=>{

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

    let subdata =await sub_category.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .populate('category_id').limit(perpage).skip(perpage*page).exec();

    let totaldocuments= await sub_category.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();
    // var sub_categoryrecord=req.cookies.sub_category;
    return res.render("view_subcategory",{
        subcatdata : subdata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    })
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await sub_category.findById(req.params.id);
    if(oldData.sub_category_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.sub_category_image);
       await fs.unlinkSync(fullpath);
    }
    await sub_category.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

//update

module.exports.updatedata = async(req,res)=>{
    let sub_categorydata = await sub_category.findById(req.params.id).populate("category_id").exec();;
    var categorydata=await category.find({isActive:true});
    // var sub_categoryrecord=req.cookies.sub_category;
    return res.render('update_subcategory',{
        subdata : sub_categorydata,
        catedata :categorydata
    })
}

module.exports.update_subcategory= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    if(req.file)
    {
        let olddata = await sub_category.findById(req.body.EditId);
       
        if(olddata.sub_category_image)
            {
                let full=path.join(__dirname,"..",olddata.sub_category_image);
                await fs.unlinkSync(full);
            }
            req.body.upadated_date = new Date().toLocaleString();
            var imagepath ='';
            imagepath = sub_category.sub_categorypath+"/"+req.file.filename;
            req.body.sub_category_image=imagepath;
    
        await sub_category.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_subcategory' ) 
    }
    else
    {
        req.body.upadated_date = new Date().toLocaleString();
        let oldimage = await sub_category.findById(req.body.EditId);
        req.body.sub_category_image=oldimage.sub_category_image;
        await sub_category.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_subcategory')
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
        let activedata = await sub_category.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await sub_category.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await sub_category.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}
