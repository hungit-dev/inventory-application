const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/",(req,res)=>{
    res.render("home-page")
    
})
indexRouter.get("/create",(req,res)=>{
    res.render("create-page")
    
})

module.exports = indexRouter;