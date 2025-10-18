const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function showAllOrdersGet (req,res){
    try {
        const orders= await db.showAllOrders()
        res.send(orders)
    }
    catch(err) {
        console.error(err)
        res.status(500).send("Sever error")
    }
    
}

module.exports = {
    showAllOrdersGet
}