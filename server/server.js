const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");

const cors = require('cors');
const { salvarLivro, obterLivros, obterPdfLivro, upload, connectDB, deleteTempPdf, deletarLivro } = require("./pdfController");

app.use(cors({
    origin: "*",  
    methods: "*",  
    allowedHeaders: "*",  
}));

app.use(express.json());

app.post("/cadastrar", async (req, res) => {
    //db.insert("usuarios", req.body);
    //res.json({ "status": "cadastrado" });
    let verificarUser = await db.Bool_verifyUserAnotacoes("anotacoes", req.body.user);
    if(verificarUser){
        res.json({"status": "usuario ja existente"})
    } else {    
        db.insert("anotacoes", {
            itens: [],
            user: req.body.user
        })
    }
});

app.post("/criar_pagina/:iduser", async (req, res) => {
    let verificarTitulos = await db.Bool_verifyAllItemsCollection("anotacoes", "titulo", req.body.titulo, req.params.iduser);
    let anotacao = {
        titulo: req.body.titulo,
        tags: req.body.tags,
        criacao: req.body.criacao,
        conteudo: ""
    };

    if (verificarTitulos) {
        res.json({ "status": "pagina ja existente" });
    } else {
        await db.insertAnotacao("anotacoes", anotacao, req.params.iduser);
        res.json({ "status": "pagina inserida" });
    }
});

app.get("/pagina/:idpagina/:iduser", async (req, res) => {
    let nomePag = req.params.idpagina;
    let nomeUser = req.params.iduser;
    let coll = await db.getAllCollection("anotacoes", nomeUser);

    let retornarDados = async () => {
        let dadosPagina = {};
        for (const element of await coll) {
            element["itens"].forEach(element => {
                if (element["titulo"] == nomePag) {
                    dadosPagina = element;
                }
            });
            
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

app.get("/anotacoes/:iduser", async (req, res) => {
    let paginas = await db.getAllCollection("anotacoes", req.params.iduser);
    if(paginas.length > 0){
        res.json(paginas[0].itens);
    }else {
        res.json(paginas);
    }
});

app.delete("/deletar_pagina/:idpagina/:iduser", async (req, res) => {
    let nomePag = req.params.idpagina;
    let nomeUser = req.params.iduser;
    try {
        await db.deleteItem("anotacoes", nomePag, nomeUser);
        res.json({ "status": "pagina deletada" });
    } catch {   
        res.json({ "status": "erro ao deletar" });
    }
});

app.post("/adicionar_anotacoes/:iduser", async (req, res) => {
    let nomePag = req.body.titulo;
    let conteudo = req.body.conteudo;
    let nomeUser = req.params.iduser;
    db.updateContent("anotacoes", { user: nomeUser, "itens.titulo": nomePag }, { $set: { "itens.$.conteudo": conteudo } });
    res.json({ "status": "conteudo alterado" });
});

// Rotas para o pdfController
app.post("/api/salvar-livro", upload.single('pdf'), salvarLivro);
app.get("/api/obter-livros", obterLivros);
app.get("/api/obter-pdf/:id", obterPdfLivro);
app.delete('/api/deletar-livro/:id', deletarLivro);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.delete('/api/livro/deletar-pdf', (req,res) => {
    const { filepath } = req.body;
    console.log("Caminho recebido no backend:", filepath);
    if (!filepath) {
        return res.status(400).json({ message: 'Caminho do arquivo não fornecido' });
    }
    const absolutePath = path.resolve(filepath); // Gera caminho absoluto
    console.log("Caminho absoluto gerado:", absolutePath);
    deleteTempPdf(absolutePath)
    .then(() => {
        res.status(200).json({message : 'Arquivo deletado com sucesso'})
        console.log("Arquivo deletado com sucesso:", absolutePath);
    })
    .catch((err) => {
        console.error("Erro ao deletar o arquivo:", err);
        res.status(500).json({message: 'Erro ao deletar o arquivo', error: err})
    });
});

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Servidor inicializado");
    });
});
