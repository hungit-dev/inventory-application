const pool = require("./pool");
async function showAllCategoryNames (){
   const { rows } = await pool.query(
    "SELECT category_name FROM categories"
  );
  return rows;
}
async function showAllCategoryNamesAndId() {
  const { rows } = await pool.query(
    "SELECT category_id,category_name FROM categories"
  );
  return rows;
}
async function getItemsForCategory(categoryId) {
  const { rows } = await pool.query(
    `SELECT categories.category_name,items.item_name,orders.quantity 
    FROM orders INNER JOIN categories
ON orders.category_id = categories.category_id 
INNER JOIN items
ON orders.item_id = items.item_id
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
async function removeCategory(categoryId) {
  await pool.query("DELETE FROM categories WHERE category_id = $1", [
    categoryId,
  ]);
}
async function searchItem(itemName){
  const {rows}=await pool.query("SELECT item_name FROM items WHERE item_name=$1",[itemName])
  return rows
}
async function getItemIdByName(itemName) {
  const {rows} = await pool.query("SELECT item_id FROM items WHERE item_name=$1",[itemName])
  return rows
}
async function addNewItem(itemName){
  await pool.query("INSERT INTO items (item_name) VALUES ($1)",[itemName])
}
async function addNewOrder(itemId,categoryId,quantity) {
  await pool.query("INSERT INTO orders (item_id,category_id,quantity) VALUES ($1,$2,$3)",[itemId,categoryId,quantity])
}
async function getCategoryIdByName(categoryName){
 const {rows} = await pool.query("SELECT category_id FROM categories WHERE category_name=$1",[categoryName])
  return rows
}

async function selectOrderByItemIdAndCategoryId(itemId,categoryId){
  const {rows} =await pool.query("SELECT * FROM orders WHERE item_id=$1 AND category_id=$2",[itemId,categoryId])
  return rows
}
module.exports = {
  showAllCategoryNames,
  showAllCategoryNamesAndId,
  getItemsForCategory,
  addNewCategory,
  removeCategory,
  searchItem,
  getItemIdByName,
  addNewItem,
  addNewOrder,
  getCategoryIdByName,
  selectOrderByItemIdAndCategoryId
};
