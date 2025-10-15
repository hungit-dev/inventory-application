const { Router } = require("express");
const itemsRouter = Router();
itemsRouter.get("/create", (req, res) => {
  res.render("create-item-page");
});
itemsRouter.get("/1",(req,res)=>{
  res.render("item-view")
})
module.exports = itemsRouter;
