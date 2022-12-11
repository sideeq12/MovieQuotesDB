const functions = require("firebase-functions");
const admins = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();




// Routes

app.get("/helloWorld", (req, res)=>{
    return res.status(200).send("Helo world")
})

// Create route


// Read routes

// Delete route




exports.app = functions.https.onRequest(app)