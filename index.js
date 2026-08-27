const express = require("express")
const app = express();
const PORT = 8000;


app.get("/", (req, res) => {
    res.send("Welcome to Dairy Flow")
    
})


app.listen(PORT, () =>  console.log(`The server has successfully connected to PORT ${PORT}`))