const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
async function showItemsInCategoryGet(req, res) {
  //show all items in 1 category
  try {
    category_id = Number(req.params.id);
    const data = await db.getItemsForCategory(category_id);
    const categoryName = data[0]["category_name"];
    let categoryInfo = {};
    let items = [];
    categoryInfo.categoryName = categoryName;
    categoryInfo.items = items;
    for (let item of data) {
      if (item["item_name"]) {
        const itemInfo = {
          itemName: item["item_name"],
          quantity: item["quantity"],
          itemId: item["item_id"],
          categoryId: category_id,
        };
        categoryInfo.items.push(itemInfo);
      }
    }
    res.render("category-view", {
      category: categoryInfo.categoryName,
      items: categoryInfo.items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Sever error");
  }
}
const validateCategoryForm = [
  body("category-name").trim().notEmpty().withMessage("Name cannot be empty."),
];
async function addNewCategoryPost(req, res) {
  //add new category
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("create-category-page", { errors: errors.array() });
  }
  const categoryRows = await db.getCategoryIdByName(req.body["category-name"]);
  if (categoryRows.length > 0) {
    //if the category already exists, show error
    res.render("create-category-page", {
      errors: [{ msg: "Category already exists" }],
    });
    return;
  }
  await db.addNewCategory(req.body["category-name"]);
  res.redirect("/");
}
async function removeCategoryGet(req, res) {
  const id = req.params.id;
  await db.removeCategory(id);
  res.redirect("/");
}
async function showFormToEditGet(req,res) {
  const categoryNameRows = await db.searchCategoryNameById(req.params.id)
  const categoryName=categoryNameRows[0].category_name
  res.render('edit-category-page',{errors:[],categoryName:categoryName,id:req.params.id})
}
async function editCategoryNamePost(req,res){
  const categoryId=req.params.id
  const newName=req.body["category-name"]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("create-category-page", { errors: errors.array() });
  }
  await db.editCategoryName(newName,categoryId)
  res.redirect("/")
}
module.exports = {
  showItemsInCategoryGet,
  validateCategoryForm,
  addNewCategoryPost,
  removeCategoryGet,
  showFormToEditGet,
  editCategoryNamePost
};
