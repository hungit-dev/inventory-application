const { Router } = require("express");
const categoriesRouter = Router();
categoriesRouter.get("/create", (req, res) => {
  res.render("create-category-page");
});
categoriesRouter.get("/1",(req,res)=>{
  res.render("category-view");
})
module.exports = categoriesRouter;
