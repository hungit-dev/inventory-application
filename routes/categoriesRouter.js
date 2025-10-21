const { Router } = require("express");
const categoriesRouter = Router();
const controller = require("../controllers/categoriesController.js");
categoriesRouter.get("/create", (req, res) => {
  res.render("create-category-page");
});
categoriesRouter.get("/:id", controller.showItemsInCategoryGet);
module.exports = categoriesRouter;
