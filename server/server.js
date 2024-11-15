const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");

const cors = require('cors');
const { salvarLivro, obterLivros, upload, connectDB } = require("./pdfController");

app.use(cors({
    origin: "*",  
    methods: "*",  
    allowedHeaders: "*",  
}));

app.use(express.json());

app.post("/cadastrar", (req, res) => {
    db.insert("usuarios", req.body);
    res.json({ "status": "cadastrado" });
});

app.post("/criar_pagina", async (req, res) => {
    let verificarTitulos = await db.Bool_verifyAllItemsCollection("anotacoes", "titulo", req.body.titulo);
    let anotacao = {
        titulo: req.body.titulo,
        tags: req.body.tags,
        criacao: req.body.criacao,
        conteudo: ""
    };

    if (verificarTitulos) {
        res.json({ "status": "pagina ja existente" });
    } else {
        await db.insert("anotacoes", anotacao);
        res.json({ "status": "pagina inserida" });
    }
});

app.get("/pagina/:idpagina", async (req, res) => {
    let nomePag = req.params.idpagina;
    let coll = await db.getAllCollection("anotacoes");

    let retornarDados = async () => {
        let dadosPagina = {};
        for (const element of await coll) {
            if (element["titulo"] == nomePag) {
                dadosPagina = element;
            }
        }
        return dadosPagina;
    };

    let data = await retornarDados();
    if (Object.keys(data).length < 0) {
        res.json({ "erro": "not found" });
    } else {
        res.json(data);
    }
});

app.get("/anotacoes", async (req, res) => {
    let paginas = await db.getAllCollection("anotacoes");
    res.json(paginas);
});

app.delete("/deletar_pagina/:idpagina", async (req, res) => {
    let nomePag = req.params.idpagina;
    try {
        await db.deleteItem("anotacoes", "titulo", nomePag);
        res.json({ "status": "pagina deletada" });
    } catch {   
        res.json({ "status": "erro ao deletar" });
    }
});

app.post("/adicionar_anotacoes", async (req, res) => {
    let nomePag = req.body.titulo;
    let conteudo = req.body.conteudo;
    db.updateContent("anotacoes", { "titulo": nomePag }, { "conteudo": conteudo });
    res.json({ "status": "conteudo alterado" });
});

// Rotas para salvar e obter o livro (PDF)
app.post("/api/salvar-livro", upload.single('pdf'), salvarLivro);
app.get("/api/obter-livros", obterLivros);


connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Servidor inicializado");
    });
});
