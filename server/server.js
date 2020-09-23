const express = require("express")
const app = express()
const path = require("path")
const fs = require('fs');
const allRouter = require("./public/index.js")
const {
    PORT
} = require('./config.json');

app.use(express.static(path.join(__dirname, "./public"), {}))
app.use('/api', allRouter)



app.listen(PORT, () => {
    console.log("server  is running in " + PORT)
})