// const express = require('express');
// const router = express.Router();
import { Router } from "express";
const viewsRouter=Router();

viewsRouter.get('/',(req,res)=>{
    res.render('login');
})
//module.exports={viewsRouter}

export default viewsRouter;