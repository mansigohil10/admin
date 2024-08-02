const express=require('express');

const routes=express.Router();

const offerController=require("../controller/offerController");

routes.get("/add_offer",offerController.add_offer);
routes.get("/view_offer",offerController.view_offer);
routes.post("/insertofferdata",offerController.insertofferdata);


routes.get("/deletedata/:id",offerController.deletedata);
routes.get("/updatedata/:id",offerController.updatedata);
routes.post("/updateoffer",offerController.updateoffer);
routes.post("/deletemanyrecord",offerController.deletemanyrecord);

routes.get("/setDeactive/:id",offerController.setDeactive);
routes.get("/setactive/:id",offerController.setactive);


module.exports=routes;