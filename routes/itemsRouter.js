const { Router } = require("express");
const itemsRouter = Router();
itemsRouter.get("/create", (req, res) => {
  res.render("create-item-page");
});
module.exports = itemsRouter;
