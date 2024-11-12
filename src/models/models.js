function criarUser(nome, email, telefone, senha, foto, tokenspotify, tokengoogle){
    let user = {
        "nome":nome,
        "email":email,
        "telefone":telefone,
        "senha":senha,
        "foto":foto,
        "tokensapi": {
            "tokenspotify":tokenspotify,
            "tokengoogle":tokengoogle
        }
    }
    return user
}


export default criarUser