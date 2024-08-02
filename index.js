const express=require('express');

const port=8001;

const app=express();

const session=require('express-session');

const passport=require('passport');

const passportLocal =require("./config/passport-local-strategy");

const path=require('path');

const fs=require('fs');

const cookieParser=require('cookie-parser');

const db = require("./config/mongoose");
const Admin=require('./models/admin');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cookieParser());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));


app.use(session({
    name : "mansi",
    secret:"mansi",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge : 1000*60*100
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/",require("./routes/user"));

app.use("/admin",require("./routes/admin"));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.listen(port,(err)=>{
    if(err)
    {
        console.log(err);
    }
    console.log("connected successfully",port);
});