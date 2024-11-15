const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    fileId: mongoose.Schema.Types.ObjectId, // Referência ao arquivo no GridFS
});

const Livro = mongoose.model('Leitura', livroSchema); // Modelo para a coleção 'leitura'

module.exports = Livro;