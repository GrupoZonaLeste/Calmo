const express = require("express")
const app = express()
const db = require("./db")
const cors = require('cors');

app.use(cors({
    origin: "*"
}));

app.use(express.json());


app.post("/cadastrar", (req, res) => {
    db.insert("usuarios", req.body)
    res.json({"status": "cadastrado"})
})

app.listen(5000 , () => {
    console.log("servidor inicializado")
})