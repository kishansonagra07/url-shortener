const express = require("express");
const validUrl = require("valid-url");
const shortId = require("shortid");
const Url = require("./../models/url");
const router = express.Router();

// add short url
router.post('/short', async (req, res) => {
    const actualURL = req.body.url;
    const baseURL = process.env.BASE_URL;

    if(!validUrl.isUri(baseURL) || !validUrl.isUri(actualURL)){
        return res.status(400).json({ "status" : "failed","message" : "Invalid URL"});
    }
    try {
        const isShorten = await Url.findOne({ realUrl : actualURL });
        if(isShorten){
           return res.status(200).json({"status" : "success", "data" : `${baseURL}/${isShorten.urlCode}` });
        } else {
            let genCode = shortId.generate();
            const isSameCode = await Url.findOne({ urlCode : genCode });           
            if(isSameCode){                
                // if short code is exists in db we do more random things like mixing codes
                const time = new Date();
                const first = time.getMilliseconds();
                const finalCode = quiteRandom(genCode, first.toString());
                genCode =  finalCode;                                
            }
            try {
                const addUrl = new Url({
                    realUrl : actualURL,
                    urlCode : genCode,
                    date : new Date()
                });
                const finalResult = await addUrl.save();
                return res.status(200).json({"status" : "success", "data" : `${baseURL}/${genCode}` });
            }catch{
                return res.status(500).json({ "status" : "failed","message" : "Something went wrong"});
            }         
        }
    }catch{
        return res.status(500).json({ "status" : "failed","message" : "Something went wrong"});
    }
});

// mixing two values
function quiteRandom(real, micro){
    let output = "";
    for (var i = 0; i < Math.max(real.length, micro.length); i++) {
      if (real.length > i) {
          output += real[i];
      }
      if (micro.length > i) {
          output += micro[i];
      }
    }
    return output;
}
module.exports = router;