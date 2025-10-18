const pool = require("./pool");
async function showAllOrders(){
    const {rows}=await pool.query("SELECT * FROM orders")
    return rows
}

module.exports = {
    showAllOrders
}