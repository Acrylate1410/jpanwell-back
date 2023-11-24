const express = require('express');
const router = express.Router()
const Model = require('../model/product');
const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    next();
};
router.use(express.json())
router.use(cors)

router.get('/', (req, res) => {
    res.send("Cron")
})

router.get('/get_one_product/:id', async (req, res) => {
    try{
        const data = await Model.find({link: req.params.id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/get_favorites', async (req, res) => {
    try{
        const data = await Model.find({isLiked: true});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/get_products', async (req, res) => {
    try {
        const orders = await Model.find()
        res.json(orders)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
module.exports = router;