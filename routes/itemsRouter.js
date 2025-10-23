const { Router } = require("express");
const itemsRouter = Router();
const controller = require("../controllers/itemsController.js");
const {
  validateItemForm,
} = require("../controllers/itemsController.js");
itemsRouter.get("/create", controller.showCreateItemPageGet);
itemsRouter.post("/create",validateItemForm,controller.addNewItemToCategoryPost)
itemsRouter.get("/1",(req,res)=>{
  res.render("item-view")
})
module.exports = itemsRouter;
