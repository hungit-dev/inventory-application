const db = require("../db/queries");
async function showItemsInCategoryGet(req, res) {
  try {
    category_id = Number(req.params.id);
    const data = await db.getItemsForCategory(category_id);
    const categoryName = data[0]["category_name"];
    let categoryInfo = {};
    let items = [];
    categoryInfo.categoryName = categoryName;
    categoryInfo.items = items;
    if (data.length > 1) {
      for (let item of data) {
        const itemInfo = {
          customer_name: item["customer_name"],
          quantity: item["quantity"],
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
module.exports = {
  showItemsInCategoryGet,
};
