const review=require("../models/review");

const path=require('path');

const fs=require('fs');

module.exports.add_review=async(req,res)=>{
    return res.render("add_review")
}

module.exports.insertreviewdata=async(req,res)=>{
  try
  {
    // console.log(req.body);
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let reviewdt=await review.create(req.body);
    return res.redirect("back")
}
catch(err)
{
    console.log(err);
    return res.redirect("back");
  }
}

module.exports.view_review=async(req,res)=>{
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

  let reviewdata=await review.find({
      $or:[
          {"name" :{$regex : ".*"+search+".*",$options : "i"}}
      ]
  })
  .limit(perpage)
  .skip(perpage*page);

  let totaldocuments= await review.find({
      $or:[
          {"name" :{$regex : ".*"+search+".*",$options : "i"}}
      ]
  }).countDocuments();

  return res.render("view_review",{
      reviewdata : reviewdata,
      search : search,
      totaldocuments : Math.ceil(totaldocuments/perpage),
      currentpage : page
  })
}

module.exports.deletedata = async(req,res)=>{
  let oldData = await review.findById(req.params.id);
  
  await review.findByIdAndDelete(req.params.id);
  return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
  let reviewdata = await review.findById(req.params.id);
  return res.render('update_review',{
      reviewdata : reviewdata
  })
}


module.exports.updatereview= async(req,res)=>{
  // console.log(req.body);
  // console.log(req.file);
try{
  
    let olddata = await review.findById(req.body.EditId);
    await review.findByIdAndUpdate(req.body.EditId,req.body)
    return res.redirect('view_review')
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
        let activedata = await review.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await review.findByIdAndUpdate(req.params.id,{isActive:true});
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
  await review.deleteMany({_id :{$in : req.body.deleteall}});
  return res.redirect("back")
}