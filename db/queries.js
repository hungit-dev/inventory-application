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
module.exports = {
  showAllCategoryNames,
  getItemsForCategory,
};
