const db = require("../db/queries");

async function showCreateItemPageGet (req,res){
    const data = await db.showAllCategoryNames();
    let categoryNames=[];
    for (let category of data){
        categoryNames.push(category["category_name"])
    }
    console.log(categoryNames)
    res.render("create-item-page",{categories:categoryNames});
}

module.exports = {
    showCreateItemPageGet
}