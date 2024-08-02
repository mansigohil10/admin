const category=require("../models/category");

const path=require('path');

const fs=require('fs');

module.exports.add_category=async(req,res)=>{
    return res.render("add_category");
}

module.exports.insertcategorydata=async(req,res)=>{
    // console.log(req.body);
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let categorydata = await category.create(req.body);
    return res.redirect("back");
}

module.exports.view_category=async(req,res)=>{
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

    let categorydata=await category.find({
        $or:[
            {"category_name" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await category.find({
        $or:[
            {"category_name" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();

    return res.render("view_category",{
        categorydata : categorydata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    })
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await category.findById(req.params.id);
    
    await category.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let categorydata = await category.findById(req.params.id);
    return res.render('update_category',{
        catdata : categorydata
    })
}


module.exports.updatecategory= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    
        let olddata = await category.findById(req.body.EditId);
        await category.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_category')
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
        let activedata = await category.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await category.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await category.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}