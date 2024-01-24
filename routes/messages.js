const express = require('express');
const router = express.Router()
const Model = require('../model/message');
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

router.post('/save', async (req, res) => {
    let fullDateOrder = new Date()
    fullDateOrder.setTime(fullDateOrder.getTime() + 7 * 60 * 60 * 1000)
    let dateOrder = fullDateOrder.getDate()
    let monthOrder = fullDateOrder.getMonth() + 1

    if (dateOrder < 10) {
        dateOrder = "0" + dateOrder
    }
    if (monthOrder < 10) {
        monthOrder = "0" + monthOrder
    }
    const order = new Model({
        sortFodder: fullDateOrder.getTime(),
        date: dateOrder + "/" + monthOrder + "/" + fullDateOrder.getFullYear(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
    })
    try {
        const newOrder = await order.save()
        res.status(201).json(newOrder)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router;