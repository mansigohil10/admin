const express=require('express');

const routes=express.Router();

const subcController=require("../controller/subcController");

const sub_category=require("../models/sub_category");

routes.get("/add_sub_category",subcController.add_sub_category);
routes.get("/view_sub_category",subcController.view_sub_category);
routes.post("/insertsub_category_data",sub_category.sub_categoryuploadImage,subcController.insertsub_category_data);

routes.get("/deletedata/:id",sub_category.sub_categoryuploadImage,subcController.deletedata);
routes.get("/updatedata/:id",subcController.updatedata);
routes.post("/update_subcategory",sub_category.sub_categoryuploadImage,subcController.update_subcategory);
routes.post("/deletemanyrecord",subcController.deletemanyrecord);

routes.get("/setDeactive/:id",subcController.setDeactive);
routes.get("/setactive/:id",subcController.setactive);

module.exports=routes;