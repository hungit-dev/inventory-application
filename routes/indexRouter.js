const { Router } = require("express");
const indexRouter = Router();
const categoriesRouter = require("./categoriesRouter");
const itemsRouter = require("./itemsRouter");
const controller = require("../controllers/indexController.js");
indexRouter.get("/", controller.homePageGet);
indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/items", itemsRouter);

module.exports = indexRouter;
