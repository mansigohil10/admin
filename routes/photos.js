const express=require('express');

const routes=express.Router();

const photosController=require("../controller/photosController");

const photos=require("../models/photos");



routes.get("/add_photos",photosController.add_photos);
routes.get("/view_photos",photosController.view_photos);
routes.post("/insertphotosdata",photos.recentuploadImage,photosController.insertphotosdata)


routes.get("/deletedata/:id",photos.recentuploadImage,photosController.deletedata);
routes.get("/updatedata/:id",photosController.updatedata);
routes.post("/updatephotos",photos.recentuploadImage,photosController.updatephotos);
routes.post("/deletemanyrecord",photosController.deletemanyrecord);

routes.get("/setDeactive/:id",photosController.setDeactive);
routes.get("/setactive/:id",photosController.setactive);
module.exports=routes;