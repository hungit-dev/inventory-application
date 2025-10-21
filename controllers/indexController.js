const db = require("../db/queries");

async function homePageGet(req, res) {
  try {
    const categories = await db.showAllCategoryNames(); // get an array contains multiple obj, each obj is 1 category
    let categoryNames = [];
    for (let category in categories) {
      categoryNames.push({
        categoryName: categories[category]["category_name"],
        categoryId: categories[category]["category_id"],
      });
    }
    res.render("home-page", { categories: categoryNames });
  } catch (err) {
    console.error(err);
    res.status(500).send("Sever error");
  }
}

module.exports = {
  homePageGet,
};
