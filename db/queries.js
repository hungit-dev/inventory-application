const pool = require("./pool");
async function showAllCategoryNames() {
  const { rows } = await pool.query("SELECT category_name FROM categories");
  return rows;
}

module.exports = {
  showAllCategoryNames,
};
