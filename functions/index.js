const functions = require("firebase-functions");
const admin = require("firebase-admin");
const bodyParser = require("body-parser")

var serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const express = require("express");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended : true}))
 const cors = require("cors");
app.use(cors({origin : true }))




// Routes

app.get("/helloWorld", (req, res)=>{
    return res.status(200).send("Helo world")
})

// Create route

app.post("/api/create", (req, res)=>{
    const info = JSON.parse(req.body)
    const { name, quote, year, id, genre } = info;
    (async  ()=>{
        try{
            await db.collection("movies").doc('/' + id + '/')
            .create({
                name : name,
                quote : quote,
                year : year,
                genre : genre
            })

            return res.status(200).send()
        }
        catch(err){
            console.log(err);
            return res.status(500).send(err)
        }
    })()
})

// Read routes GET request

app.get("/api/get/:id", (req, res)=>{
    (async  ()=>{
        try{
            const documents = db.collection("movies").doc(req.params.id)
            let products = await documents.get()
            let response = products.data();
            return res.status(200).send(response);
        }
        catch(err){ 
            console.log(err);
            return res.status(500).send(err)
        }
    })()
})

// Delete route

app.delete("/api/delete/:id", (req, res)=>{
    (async  ()=>{
        try{
            const documents = db.collection("movies").doc(req.params.id)
            await documents.delete()
            return res.status(200).send(response);
        }
        catch(err){ 
            console.log(err);
            return res.status(500).send(err)
        }
    })()
})

// PUT / UPDATE




exports.app = functions.https.onRequest(app)