const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateItemForm = [
  body("item-name").trim().notEmpty().withMessage("Name cannot be empty."),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity cannot be empty.")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive number"),
];

async function showCreateItemPageGet(req, res) {
  try {
    //get all categories and show them as options in create item form
    const data = await db.showAllCategoryNames();
    let categoryNames = [];
    for (let category of data) {
      categoryNames.push(category["category_name"]);
    }
    res.render("create-item-page", { categories: categoryNames, errors: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function addNewItemToCategoryPost(req, res) {
  try {
    const data = await db.showAllCategoryNames();
    let categoryNames = [];
    for (let category of data) {
      categoryNames.push(category["category_name"]);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-item-page", {
        categories: categoryNames,
        errors: errors.array(),
      });
    }
    //get item_id to add to create new order
    const itemNameData = await db.searchItem(req.body["item-name"]);
    if (itemNameData.length === 0) {
      //run if item which user is trying to add does not exist
      await db.addNewItem(req.body["item-name"]);
    }
    const itemRows = await db.getItemIdByName(req.body["item-name"]);
    const itemId = Number(itemRows[0].item_id);

    //get category_id to create new order
    const categoryRows = await db.getCategoryIdByName(req.body["category"]);
    const categoryId = Number(categoryRows[0].category_id);

    //get quantity to create new order
    const quantity = Number(req.body["quantity"]);
    const orderRows = await db.selectOrderByItemIdAndCategoryId(
      itemId,
      categoryId
    );
    if (orderRows.length === 0) {
      //check if item not exists in the category
      await db.addNewOrder(itemId, categoryId, quantity);
    } else {
      res.render("create-item-page", {
        categories: categoryNames,
        errors: [{ msg: "Item  already exists in the category" }],
      }); // if exists, alert user
      return;
    }
    res.redirect(`/categories/${categoryId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function showItemInCategoryGet(req, res) {
  try {
    const dataRows = await db.selectOrderByItemIdAndCategoryId(
      req.params.itemId,
      req.params.categoryId
    );
    const itemId = dataRows[0].item_id;
    const categoryId = dataRows[0].category_id;
    const quantity = dataRows[0].quantity;
    const itemNameRows = await db.searchItemNameById(itemId);
    const categoryNameRows = await db.searchCategoryNameById(categoryId);
    const itemName = itemNameRows[0].item_name;
    const categoryName = categoryNameRows[0].category_name;
    const order = {
      categoryId: categoryId,
      itemId: itemId,
      itemName: itemName,
      categoryName: categoryName,
      quantity: quantity,
    };
    res.render("item-view", { order: order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function removeItemFromCategoryGet(req, res) {
  try {
    await db.removeItemFromCategory(req.params.itemId, req.params.categoryId);
    res.redirect(`/categories/${req.params.categoryId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  showCreateItemPageGet,
  validateItemForm,
  addNewItemToCategoryPost,
  showItemInCategoryGet,
  removeItemFromCategoryGet,
};
