const express=require('express');

const routes=express.Router();

const reviewController=require("../controller/reviewController");


routes.get("/add_review",reviewController.add_review);
routes.get("/view_review",reviewController.view_review);
routes.post("/insertreviewdata",reviewController.insertreviewdata);

routes.get("/deletedata/:id",reviewController.deletedata);
routes.get("/updatedata/:id",reviewController.updatedata);
routes.post("/updatereview",reviewController.updatereview);
routes.post("/deletemanyrecord",reviewController.deletemanyrecord);

routes.get("/setDeactive/:id",reviewController.setDeactive);
routes.get("/setactive/:id",reviewController.setactive);
module.exports=routes;