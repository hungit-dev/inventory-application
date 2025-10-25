const { Router } = require("express");
const categoriesRouter = Router();
const controller = require("../controllers/categoriesController.js");
const {
  validateCategoryForm,
} = require("../controllers/categoriesController.js");
categoriesRouter.get("/create", (req, res) => {
  res.render("create-category-page", { errors: [] });
});
categoriesRouter.post(
  "/create",
  validateCategoryForm,
  controller.addNewCategoryPost
);
categoriesRouter.get("/:id/remove", controller.removeCategoryGet);
categoriesRouter.get("/:id", controller.showItemsInCategoryGet);
categoriesRouter.get("/:id/edit",controller.showFormToEditGet)
categoriesRouter.post("/:id/edit",validateCategoryForm,controller.editCategoryNamePost)
module.exports = categoriesRouter;
