const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./router/route')
const port = process.env.PORT
require('./db/prodb');
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use([router])

app.listen(port, () => {
    console.log(`Our Server is running at port ${port}`)
})
