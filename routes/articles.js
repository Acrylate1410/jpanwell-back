const express = require('express');
const router = express.Router()
const Model = require('../model/article');
var bodyParser = require('body-parser');
var fs = require('fs');
const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    next();
};
const path = require("path");
router.use(express.static(path.join(__dirname, "./uploads/")));
router.use(express.json())
router.use(cors)
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../front/public")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage })
router.post("/upload", upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'content', maxCount: 1 }]), (req, res) => {
    let fullDateOrder = new Date()
    const article = new Model({
        sortFodder: fullDateOrder.getTime(),
        date: "29/08/2022",
        title: "CHƯƠNG TRÌNH THIỆN NGUYỆN “CHIA SẺ CỘNG ĐỒNG” CỦA CÔNG TY CỔ PHẦN HIROKI – NHÃN HÀNG JPANWELL",
        description: "Ngày 12-8-2021, Công ty cổ phần Hiroki chung tay góp phần ủng hộ quỹ phòng chống Covid-19 tại Hà Nội. Thời gian gần đây, dịch bệnh Covid-19 diễn biến phức tạp, khó lường, gây ra những thiệt hại về người, vật chất và tinh thần, ảnh hưởng trực tiếp đến đời sống, sản xuất, kinh […]",
        thumbnail: "HAI_4352-1536x1024.jpg",
        content: "CHƯƠNG TRÌNH THIỆN NGUYỆN “CHIA SẺ CỘNG ĐỒNG” CỦA CÔNG TY CỔ PHẦN HIROKI – NHÃN HÀNG JPANWELL.docx"
    })
    article.save()
});
router.get('/get_articles', async (req, res) => {
    try {
        const articles = await Model.find().sort({"sortFodder": -1})
        res.json(articles)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});
router.get('/get_latest_articles', async (req, res) => {
    try {
        const articles = await Model.find().sort({"sortFodder": -1}).limit(6)
        res.json(articles)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});
router.get('/get_one_article/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.patch('/update/:id',  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'content', maxCount: 1 }]), async (req, res) => {
    try {
        fs.unlink("../front/public/" + req.body.oldThumbnail, function (err) {
            if (err) throw err;
        });
        fs.unlink("../front/public/" + req.body.oldContent, function (err) {
            if (err) throw err;
        });
        const result = await Model.findByIdAndUpdate(
            req.params.id, 
                {title: req.body.title, 
                description: req.body.description,
                thumbnail: req.files.thumbnail[0].filename, 
                content: req.files.content[0].filename}, 
            {new: true}
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.delete('/delete', async (req, res) => {
    const articles = req.body.articlesToDelete
    try {
        for (let i in articles) {
            fs.unlink("../front/public/" + articles[i].thumbnail, function (err) {
                if (err) throw err;
            }); 
            fs.unlink("../front/public/" + articles[i].content, function (err) {
                if (err) throw err;
            });
            const data = await Model.findByIdAndDelete(articles[i]._id)
            res.send(data.name)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})
module.exports = router;