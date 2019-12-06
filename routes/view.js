const express = require("express");
const Url = require("./../models/url");
const router = express.Router();

router.get('/:code', async (req, res) => {
    try{
        const url = await Url.findOne({ urlCode : req.params.code });
        if(url){
            return res.redirect(url.realUrl);
        } else {
            return res.status(404).json({ "status" : "failed","message" : "No URL found"});
        }
    }catch{
        return res.status(500).json({ "status" : "failed","message" : "Something went wrong"});
    }
});

module.exports = router;