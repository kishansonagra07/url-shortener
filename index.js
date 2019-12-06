require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const viewUrl = require("./routes/view");
const addUrl = require("./routes/url");
const app = express();

// connect to db
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser : true,useUnifiedTopology: true } , (err, done) => {
    if(err) return console.log('DB failed');
    console.log('connected db..');
});

// middleware
app.use(express.json({ extended : false }));

// routes
app.use('/',viewUrl);
app.use('/api',addUrl);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
