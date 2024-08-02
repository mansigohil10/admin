const contact=require("../models/contact");

const path=require('path');

const fs=require('fs');

module.exports.view_contact=async(req,res)=>{
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

    let contactdata=await contact.find({
        $or:[
            {"email" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await contact.find({
        $or:[
            {"email" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();

    return res.render("view_contact",{
        contactdata : contactdata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    })
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await contact.findById(req.params.id);
    
    await contact.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}



module.exports.setDeactive= async(req,res)=>
{
    // console.log(req.params.id);
    try{
        if(req.params.id)
    {
        let activedata = await contact.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await contact.findByIdAndUpdate(req.params.id,{isActive:true});
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
    await contact.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back")
}