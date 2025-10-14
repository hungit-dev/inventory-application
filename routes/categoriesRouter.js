const { Router } = require("express");
const categoriesRouter = Router();
categoriesRouter.get("/create", (req, res) => {
  res.render("create-category-page");
});
module.exports = categoriesRouter;
