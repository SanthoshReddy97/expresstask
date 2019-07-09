const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = mongoose.model('Items')

router.get('/parameters', (req, res) => {
    res.render('parameters', {viewTitle: "Add Items"});
});


router.get("/middlewares", (req, res) => {
  res.send(req.body)
});

router.post('/parameters', (req, res) => {
  insertRecord(req,res);
});

function insertRecord(req, res) {
    var item = new Item();
    item.Item = req.body.Item;
    item.save((err, doc) => {
        if(!err){
            res.redirect('/mongo')
        }else{
            console.log("error" + err)
        }
    });
};


router.get('/mongo', (req, res) => {
    Item.find((err, docs) => {
        if(!err) {
            res.render('mongo', {reports: docs})
        }
        else {
            console.log(err);
        }
      });
});



module.exports = router
