//DATABASE CONNECTION
require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true //FALTU KI WARNING SE BACHNE K LIYE
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})