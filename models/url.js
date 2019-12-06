const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    realUrl : String,
    urlCode : String,
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('url', urlSchema);