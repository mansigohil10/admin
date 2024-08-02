const express=require('express');

const routes=express.Router();

const contactController=require("../controller/contactController");

routes.get("/view_contact",contactController.view_contact);

routes.get("/deletedata/:id",contactController.deletedata);
routes.post("/deletemanyrecord",contactController.deletemanyrecord);

routes.get("/setDeactive/:id",contactController.setDeactive);
routes.get("/setactive/:id",contactController.setactive);


module.exports=routes;