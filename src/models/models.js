function criarUser(nome, email, telefone, foto, tokenspotify, tokengoogle){
    let user = {
        "nome":nome,
        "email":email,
        "telefone":telefone,
        "foto":foto,
        "tokensapi": {
            "tokenspotify":tokenspotify,
            "tokengoogle":tokengoogle
        }
    }
    return user
}


export default criarUser