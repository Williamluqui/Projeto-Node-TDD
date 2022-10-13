let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pics",{useNewUrlParser:true}
);

module.exports = mongoose;