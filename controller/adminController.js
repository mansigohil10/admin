
const Admin=require('../models/admin');

const path=require('path');

const fs=require('fs');

const nodemailer = require("nodemailer");

module.exports.dashboard=async(req,res)=>{
    return res.render('dashboard')
}

module.exports.add_admin=async(req,res)=>{
    return res.render("add_admin");
}

module.exports.view_admin=async(req,res)=>{

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
    let admindata = await Admin.find({
        $or:[
            {"name" :{$regex : ".*"+search+".*",$options : "i"}},
            {"email" :{$regex : ".*"+search+".*",$options : "i"}},
            {"gender" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let totaldocuments= await Admin.find({
        $or:[
            {"name" :{$regex : ".*"+search+".*",$options : "i"}},
            {"email" :{$regex : ".*"+search+".*",$options : "i"}},
            {"gender" :{$regex : ".*"+search+".*",$options : "i"}}
        ]
    }).countDocuments();
    return res.render("view_admin",{
        addata : admindata,
        search : search,
        totaldocuments : Math.ceil(totaldocuments/perpage),
        currentpage : page
    })
}

module.exports.insertAdmindata=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    try
    {
        var imgpath='';
        req.body.name=req.body.fname+" "+req.body.lname
        if(req.file)
        {
            imgpath = Admin.adminpath+"/"+req.file.filename;
        }
        req.body.admin_image=imgpath;
        req.body.isActive=true;
        req.body.created_date=new Date().toLocaleDateString();
        req.body.updated_date=new Date().toLocaleDateString();
        let adminData = await Admin.create(req.body);
       return res.redirect("view_admin");
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.setDeactive= async(req,res)=>
{
    // console.log(req.params.id);
    try{
        if(req.params.id)
    {
        let activedata = await Admin.findByIdAndUpdate(req.params.id,{isActive:false});
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
        let activedata = await Admin.findByIdAndUpdate(req.params.id,{isActive:true});
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

module.exports.chekLogin = async(req,res)=>{
    return res.redirect('/admin/dashboard');
}

module.exports.deletedata = async(req,res)=>{
    let oldData = await Admin.findById(req.params.id);
    if(oldData.admin_image)
    {
       let fullpath = path.join(__dirname,"..",oldData.admin_image);
       await fs.unlinkSync(fullpath);
    }
    await Admin.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}


//update

module.exports.updatedata = async(req,res)=>{
    let admindata = await Admin.findById(req.params.id);
    return res.render('update',{
        addata : admindata,
        olddaTa :admindata
    })
}

module.exports.updateadmin= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
  try{
    if(req.file)
    {
        let oldadmindata = await Admin.findById(req.body.EditId);
       
        if(oldadmindata.admin_image)
            {
                let full=path.join(__dirname,"..",oldadmindata.admin_image);
                await fs.unlinkSync(full);
            }
            req.body.name = req.body.fname+" "+req.body.lname;
            var imagepath ='';
            imagepath = Admin.adminpath+"/"+req.file.filename;
            req.body.admin_image=imagepath;
    
        await Admin.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_admin' ) 
    }
    else
    {
        let oldimage = await Admin.findById(req.body.EditId);
        req.body.admin_image=oldimage.admin_image;
        await Admin.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('view_admin')
    }
  }
  catch(err){
    console.log(err);
    return res.redirect("back")
  }
   
}


//change password

module.exports.changePassword=async(req,res)=>{
    return res.render("change_password");

}


module.exports.modifypassword=async(req,res)=>{
    // console.log(req.body);
    if(req.user.password == req.body.cpass)
    {
        if(req.body.cpass != req.body.npass)
        {
            if(req.body.npass == req.body.copass)
            {
                let allAdmin = await Admin.findById(req.user._id)
                if(allAdmin)
                {
                    let editpass = await Admin.findByIdAndUpdate(allAdmin.id,{'password':req.body.npass});
                    if(editpass)
                    {
                       return res.redirect('/admin/logout')
                    }
                    else{
                        console.log("password not change");
                    }
                }
                else{
                    console.log("Record not found");
                }
            }
            else{
                console.log("new and confirm password are not match");
            }
        }
        else{
            console.log("current and new oassword are same");
        }
    }
    else{
        console.log("current password is not match");
    }
}


//PROFILE
module.exports.profile = async(req,res)=>{
    let admindata = await Admin.find();
    return res.render("profile");
}

//FORGOT PASSWORD
module.exports.chekemail= async(req,res)=>{
    // console.log(req.body);
   try
   {
    let chekemail=await Admin.findOne({email : req.body.email});
    if(chekemail)
    {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: "mansigohil2003@gmail.com",
              pass: "hvmyjereepllooux",
            },
          });


          var otp = Math.round(Math.random()*10000);
          res.cookie('otp',otp);
          res.cookie('email',chekemail.email);

          const info = await transporter.sendMail({
            from: 'mansigohil2003@gmail.com', // sender address
            to: chekemail.email, // list of receivers
            subject: "click on link", // Subject line
            text: "click here", // plain text body
            html: `<b>OTP is here :${otp}</b>`// html body
            // html: `<a href="http://localhost:9999/admin/resetpass">reset password </a>`, 
          });
          
          if(info)
          {
             return res.redirect("otppage");
          }
          else
          {
                return res.redirect("back");
          }
    }
    else
    {
        console.log("email not found");
        return res.redirect("back");
    }
   }
   catch(err)
   {
    console.log(err);
    return res.redirect("back");
   }
}


//otp
module.exports.chekotp=async(req,res)=>{
    // console.log(req.body);
    if(req.cookies.otp == req.body.otp)
    {
        return res.redirect('resetpass');
    }
    else
    {
        console.log("otp not match");
        return res.redirect('back');
    }
}

//verify pass
module.exports.verifypass=async(req,res)=>{
    // console.log(req.body);
    if(req.body.npass == req.body.cpass)
    {
        let email = req.cookies.email;
        let checkemail =await Admin.findOne({email : email});
        if(checkemail)
        {
            let restpass = await Admin.findByIdAndUpdate(checkemail.id,{password : req.body.npass});
            if(restpass)
            {
                res.clearCookie('otp');
                res.clearCookie('email');
                return res.redirect('/admin/')
            }
            else
            {
                console.log("email not found");
                return res.redirect('back');

            }
        }
        else
        {
            console.log("email not found");
            return res.redirect('back');
        }
    }
    else
    {
        console.log("new and confirm password are not match");
        return res.redirect('back');
    }
}

module.exports.deletemanyrecord = async(req,res)=>{
    // console.log(req.body);
    await Admin.deleteMany({_id :{$in : req.body.deleteall}});
    return res.redirect("back");
}