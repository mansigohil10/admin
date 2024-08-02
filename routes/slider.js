const express=require('express');

const slider=require("../models/slider");

const routes=express.Router();

const slidercontroller=require("../controller/sliderController");

routes.get("/add_slider",slidercontroller.add_slider);
routes.get("/view_slider",slidercontroller.view_slider);
routes.post("/insertsliderdata",slider.slideruploadImage,slidercontroller.insertsliderdata);

routes.get("/deletedata/:id",slider.slideruploadImage,slidercontroller.deletedata);
routes.get("/updatedata/:id",slidercontroller.updatedata);
routes.post("/updateadmin",slider.slideruploadImage,slidercontroller.updateadmin);
routes.post("/deletemanyrecord",slidercontroller.deletemanyrecord);

routes.get("/setDeactive/:id",slidercontroller.setDeactive);
routes.get("/setactive/:id",slidercontroller.setactive);



module.exports=routes;