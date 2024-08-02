const offer=require("../models/offer");

const path=require('path');

const fs=require('fs');

module.exports.add_offer=async(req,res)=>{
    return res.render("add_offer");
}
module.exports.insertofferdata=async(req,res)=>{
    // console.log(req.body);
    req.body.isActive=true;
    req.body.created_date=new Date().toLocaleDateString();
    req.body.updated_date=new Date().toLocaleDateString();
    let offerdata=await offer.create(req.body);
    return res.redirect("back");
}

module.exports.view_offer=async(req,res)=>{
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

    let offerdata=await offer.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await offer.find({
        $or:[
            {"title" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();

    return res.render("view_offer",{
        offerdata : offerdata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    })
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await offer.findById(req.params.id);
    
    await offer.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatedata = async(req,res)=>{
    let offerdata = await offer.findById(req.params.id);
    return res.render('update_offer',{
        ofdata : offerdata
    })
}


module.exports.updateoffer= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    
        let olddata = await offer.findById(req.body.EditId);
        await offer.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_offer')
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
        let activedata = await offer.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await offer.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await offer.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}