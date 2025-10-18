const { Router } = require("express");
const indexRouter = Router();
const categoriesRouter = require("./categoriesRouter");
const itemsRouter = require("./itemsRouter");
const controller = require('../controllers/indexController.js')
indexRouter.get("/", (req, res) => {
  res.render("home-page");
});
indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/items", itemsRouter);
indexRouter.get('/test',controller.showAllOrdersGet)
module.exports = indexRouter;
