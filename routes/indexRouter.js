const { Router } = require("express");
const indexRouter = Router();
const categoriesRouter = require("./categoriesRouter");
const itemsRouter = require("./itemsRouter");
indexRouter.get("/", (req, res) => {
  res.render("home-page");
});
indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/items", itemsRouter);

module.exports = indexRouter;
