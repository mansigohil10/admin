const express=require('express');

const routes=express.Router();

const blogController=require("../controller/blogController");

const blog=require("../models/blog");

routes.get("/add_blog",blogController.add_blog);
routes.get("/view_blog",blogController.view_blog);
routes.post("/insertblogdata",blog.bloguploadImage,blogController.insertblogdata);

routes.get("/deletedata/:id",blog.bloguploadImage,blogController.deletedata);
routes.get("/updatedata/:id",blogController.updatedata);
routes.post("/updateblog",blog.bloguploadImage,blogController.updateblog);
routes.post("/deletemanyrecord",blogController.deletemanyrecord);

routes.get("/setDeactive/:id",blogController.setDeactive);
routes.get("/setactive/:id",blogController.setactive);


routes.use("/comment",require("./comment"));
module.exports=routes;