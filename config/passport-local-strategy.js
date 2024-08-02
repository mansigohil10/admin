const passport=require('passport');
const Admin=require('../models/admin');
const passportLocal=require('passport-local').Strategy;

passport.use(new passportLocal({
    usernameField :'email'
},async function(email,password,done){
    let admindata = await Admin.findOne({email:email})
    if(admindata)
    {
        if(password == admindata.password)
        {
            return done(null,admindata)
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}))


passport.serializeUser(async(admin,done)=>{
    return done(null,admin.id);
})

passport.deserializeUser(async(id,done)=>{
    let adminRecord = await Admin.findById(id);
    if(adminRecord)
    {
        return done(null,adminRecord)
    }
    else{
        return done(null,false  )
    }
})

passport.setAuthenticatedUser =function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


passport.checkAuthenticattion=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else
    {
        return res.redirect("/admin/")
    }
}

module.exports=passport;