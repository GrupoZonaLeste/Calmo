const express = require("express")
const app = express()
const db = require("./db")
const bcrypt = require("bcryptjs")

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

    let mystr = await bcrypt.hash(req.body.titulo, 8)
    
    mystr.toString()
    let anotacao = {}
    anotacao[mystr] = {
        titulo: req.body.titulo,
        tags: req.body.tags
    }

    if (verificarTitulos) {
        res.json({"status": "pagina ja existente"})
    } else {
        await db.insert("anotacoes", anotacao)
        res.json({"status": "pagina inserida"})
    }
})

app.get("/pagina/:idpagina", async (req, res) => {
    let nomePag = req.params.idpagina
    let coll = await db.getAllCollection("anotacoes")
    
    let retornarDados = async () => {
        let dadosPagina = {}
        for (const element of await coll){
            if (await bcrypt.compare(nomePag, Object.keys(element)[1])){
                console.log("achamos a pagina")
                dadosPagina = element[Object.keys(element)[1]]
            }
        }
        console.log(dadosPagina)
        return dadosPagina
    } 

    let data = await retornarDados()
    if (Object.keys(data).length < 0) {
        res.json({"erro": "not found"})
    } else {
        res.json(data)
    }
    
})


app.listen(5000 , () => {
    console.log("servidor inicializado")
})