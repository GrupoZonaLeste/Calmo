const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const { v4, uuidv4 } = require("uuid");


console.log(`__dirname: ${__dirname}`);
const uploadDir = path.join(__dirname, 'uploads');
console.log(`uploadDir: ${uploadDir}`);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Pasta 'uploads' criada com sucesso.");
} else {
  console.log("Pasta 'uploads' já existe.");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads')); 
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

  const salvarPDFtemp = (pdfBase64) => {
    return new Promise((resolve, reject) => {

      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      const tempPdfPath = path.join(uploadDir, `temp_${Date.now()}.pdf`);
      
      console.log(`Salvando PDF temporário em: ${tempPdfPath}`);
      
      fs.writeFile(tempPdfPath, pdfBuffer, (err) => {
          if (err) {
            reject(err);
          }
          resolve(tempPdfPath); // Retorna o caminho onde o PDF foi salvo
      });
  });
  };

  const deleteTempPdf = (tempPdfPath) => {
    console.log("Iniciando exclusão do arquivo:", tempPdfPath);
    return new Promise((resolve, reject) => {
      fs.unlink(tempPdfPath, (err) => {
        if (err) {
          reject(err);
          console.error("Erro ao tentar deletar o arquivo:", tempPdfPath, "Erro:", err);
        } else { 
          resolve();
          console.log("PDF temporário deletado com sucesso:", tempPdfPath);
        }
      });
    });
  };

const obterLivros = async (req, res) => {
  try {
      const livros = await Livro.find({});  
      res.status(200).json(livros);  
  } catch (error) {
      console.error("Erro ao obter os livros:", error);
      res.status(500).json({ message: "Erro ao obter os livros" });
  }
};

  const obterPdfLivro = async (req, res) => {
    try{
        const livroId = req.params.id;
        const livro = await Livro.findById(livroId);
        console.log("Id do livro:", livroId)
        console.log("Livro buscado no BD:", livro)

        if(!livro){
          return res.status(404).json({message:'Livro não encontrado'});
        }

        const pdfBase64 = livro.pdf.toString('base64');

        const tempPdfPath = await salvarPDFtemp(pdfBase64);

        console.log(`PDF temporário criado: ${tempPdfPath}`);

        console.log(tempPdfPath);
        res.status(200).json({
          pdfUrl: `/uploads/${path.basename(tempPdfPath)}`,
        });
    } catch (error) {
        console.error("Erro ao obter os livros:", error);
        res.status(500).json({message:"Erro ao obter os livro"});
    }
  };


module.exports = { connectDB, salvarLivro, obterLivros, obterPdfLivro, deleteTempPdf, upload};
