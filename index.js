const express = require("express")
const app = express()
const mongoose = require("mongoose");
// secure keys
const {mongodbUrl} = require("./key")
const authRoutes = require("./routes/authRoutes")
const requireToken = require("./middleware/requireToken") 

// localhost address
const PORT = process.env.PORT || 5000;


// database connection
mongoose.connect(mongodbUrl)
.then((res)=> console.log("MongoDB connected successfully"))
.catch((err)=> console.error(err))


app.use(express.json())

app.use("/api",authRoutes)


app.get("/", requireToken,(req, res)=>{
    res.send("hello my email "+ req.user.password)
})

// tesing api
app.get('/test', (req, res) => {
    res.json("Api testing 123........")
})

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})