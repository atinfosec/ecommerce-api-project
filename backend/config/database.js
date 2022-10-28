const mongoose = require("mongoose");


function connectDatabase(){
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
    .then(()=>{console.log("Database Connected successfully")});
}

module.exports = connectDatabase;
