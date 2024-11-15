const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads')); // Pasta para armazenar as imagens
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
    }
  });

const upload = multer({ storage });

const livroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  pdf: Buffer, 
  pdfHash: String, 
});

const Livro = mongoose.model('Livro', livroSchema);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Calmo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB', error);
    process.exit(1);
  }
};

const gerarHashPdf = (pdfBuffer) => {
    const hash = crypto.createHash('sha256');
    hash.update(pdfBuffer);
    return hash.digest('hex');
}

// Rota para salvar o livro e seu arquivo PDF
const salvarLivro = async (req, res) => {
    const { titulo, autor } = req.body;
    const pdfPath = path.join(__dirname, 'uploads', req.file.filename);
  
    if (!pdfPath) {
      return res.status(400).json({ message: 'O arquivo PDF é obrigatório' });
    }
  
    try {
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfHash = gerarHashPdf(pdfBuffer);
      const livroExistente = await Livro.findOne({pdfHash});
      if(livroExistente){
        return res.status(400).json({message:"O arquivo PDF já foi cadastrado"});
      }
  
      const livro = new Livro({
        titulo,
        autor,
        pdf: pdfBuffer,
        pdfHash,
      });
  
      await livro.save();
      res.status(201).json({ status: "Livro cadastrado com sucesso" });

    } catch (error) {
      console.error('Erro ao salvar o livro:', error);
      res.status(500).json({ status: "Erro", message: "Erro ao salvar o arquivo PDF" });
    } finally {
      fs.unlinkSync(pdfPath);
    }
  };

  const obterLivros = async (req, res) => {
    try{
        const livros = await Livro.find();
        const livrosComCapa = livros.map((livro) => ({
            titulo: livro.titulo,
            autor: livro.autor,
            capa: livro.pdf.toString('base64'),
        }));
        res.status(200).json(livrosComCapa);
    } catch (error) {
        console.error("Erro ao obter os livros:", error);
        res.status(500).json({message:"Erro ao obter os livros"});
    }
  };


module.exports = { connectDB, salvarLivro, obterLivros, upload};
