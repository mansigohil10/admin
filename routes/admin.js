const express=require('express');

const passport=require('passport');

const admincontroller=require('../controller/adminController');

const Admin=require('../models/admin');

const routes=express.Router();

routes.get("/", async(req,res)=>{
    if(req.cookies.admin)
    {
        return res.redirect('/admin/dashboard');
    }
    return res.render('login')
});

// dashboard
routes.get("/dashboard",passport.checkAuthenticattion,admincontroller.dashboard);

// admin
routes.get("/add_admin",passport.checkAuthenticattion,admincontroller.add_admin);
routes.get("/view_admin",passport.checkAuthenticattion,admincontroller.view_admin);
routes.post("/insertAdmindata",Admin.AdminuploadImage,admincontroller.insertAdmindata);

// setactivesetDeactive
routes.get("/setDeactive/:id",admincontroller.setDeactive);
routes.get("/setactive/:id",admincontroller.setactive);

// chekLogin
routes.post("/chekLogin",passport.authenticate('local',{failureRedirect:"/admin/"}),admincontroller.chekLogin);

// deletedata
routes.get("/deletedata/:id",Admin.AdminuploadImage,admincontroller.deletedata);

// updatedata
routes.get("/updatedata/:id",admincontroller.updatedata);

// updateadmin
routes.post("/updateadmin",Admin.AdminuploadImage,admincontroller.updateadmin);

// Password
routes.get("/changePassword",admincontroller.changePassword);
routes.post("/modifypassword",admincontroller.modifypassword);

// profile
routes.get("/profile",admincontroller.profile);

// routes.get("/editprofile/:id",admincontroller.editprofile);
// routes.post("/edpersonal",Admin.AdminuploadImage,admincontroller.edpersonal);


//forgot password

routes.get("/mailpage",async(req,res)=>{
    return res.render('forgotpass/emailpage')
})

// chekemail
routes.post("/chekemail",admincontroller.chekemail);

// otppage
routes.get("/otppage",async(req,res)=>{
    return res.render('forgotpass/otppage')
})

// resetpass
routes.get("/resetpass",async(req,res)=>{
    return res.render("forgotpass/resetpass")
});

// chekotp
routes.post("/chekotp",admincontroller.chekotp);

// verifypass
routes.post("/verifypass",admincontroller.verifypass);

// deletemanyrecord
routes.post("/deletemanyrecord",admincontroller.deletemanyrecord);

//LOGOUT
routes.get("/logout",async(req,res)=>{
    res.clearCookie('admin')
    return res.redirect('/admin/');
});



routes.use('/slider',passport.checkAuthenticattion,require("./slider"));

routes.use('/offer',passport.checkAuthenticattion,require("./offer"));

routes.use('/review',passport.checkAuthenticattion,require("./review"));

routes.use('/photos',passport.checkAuthenticattion,require("./photos"));

routes.use('/blog',passport.checkAuthenticattion,require("./blog"));

routes.use('/category',passport.checkAuthenticattion,require("./category"));

routes.use('/sub_category',passport.checkAuthenticattion,require("./sub_category"));

routes.use('/contact',passport.checkAuthenticattion,require("./contact"));

module.exports=routes;
