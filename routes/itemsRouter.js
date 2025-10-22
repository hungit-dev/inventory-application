const { Router } = require("express");
const itemsRouter = Router();
const controller = require("../controllers/itemsController.js");
itemsRouter.get("/create", controller.showCreateItemPageGet);
itemsRouter.get("/1",(req,res)=>{
  res.render("item-view")
})
module.exports = itemsRouter;
