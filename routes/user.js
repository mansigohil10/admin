const express=require('express');

const routes=express.Router();

const usercontroller=require("../controller/userController");

const slider = require("../models/slider");

const comment=require("../models/comment");

routes.get("/",usercontroller.start);

routes.get("/blog_single/:id",usercontroller.blog_single);

routes.post("/addcomment",comment.commentuploadImage,usercontroller.addcomment);

routes.post("/insertcontactdata",usercontroller.insertcontactdata);

routes.get("/work_three",usercontroller.work_three);

routes.get("/contact",usercontroller.contact);


module.exports=routes;