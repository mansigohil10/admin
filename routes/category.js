const express=require('express');

const routes=express.Router();

const categoryController=require("../controller/categoryController");

routes.get("/add_category",categoryController.add_category);
routes.get("/view_category",categoryController.view_category);
routes.post("/insertcategorydata",categoryController.insertcategorydata);


routes.get("/deletedata/:id",categoryController.deletedata);
routes.get("/updatedata/:id",categoryController.updatedata);
routes.post("/updatecategory",categoryController.updatecategory);
routes.post("/deletemanyrecord",categoryController.deletemanyrecord);

routes.get("/setDeactive/:id",categoryController.setDeactive);
routes.get("/setactive/:id",categoryController.setactive);


module.exports=routes;