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

app.post("/criar_pagina", async (req,res) => {
    let verificarTitulos = await db.Bool_verifyAllItemsCollection("anotacoes","titulo", req.body.titulo)
    
    if (verificarTitulos) {
        res.json({"status": "pagina ja existente"})
    } else {
        await db.insert("anotacoes", req.body)
        res.json({"status": "pagina inserida"})
    }
})


app.listen(5000 , () => {
    console.log("servidor inicializado")
})