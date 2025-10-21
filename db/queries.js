const pool = require("./pool");
async function showAllCategoryNames() {
  const { rows } = await pool.query("SELECT category_name FROM categories");
  return rows;
}
async function getItemsForCategory(categoryId) {
  const { rows } = await pool.query(
    `SELECT categories.category_name,customers.customer_name,orders.quantity 
    FROM orders INNER JOIN categories
ON orders.category_id = categories.category_id 
INNER JOIN customers
ON orders.customer_id = customers.customer_id
WHERE categories.category_id =$1`,
    [categoryId]
  );
  if (rows.length > 0) {
    return rows;
  } else {
    const { rows } = await pool.query(
      `SELECT category_name FROM categories WHERE category_id=$1`,
      [categoryId]
    );
    return rows;
  }
}
async function addNewCategory(categoryName) {
  await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [
    categoryName,
  ]);
}
module.exports = {
  showAllCategoryNames,
  getItemsForCategory,
  addNewCategory,
};
