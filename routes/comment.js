const express=require('express');

const routes=express.Router();

const commentController=require("../controller/commentController");

const comment=require("../models/comment");

routes.get("/view_comment",commentController.view_comment);

routes.get("/deletedata/:id",commentController.deletedata);
routes.post("/deletemanyrecord",commentController.deletemanyrecord);

routes.get("/setDeactive/:id",commentController.setDeactive);
routes.get("/setactive/:id",commentController.setactive);




module.exports=routes;