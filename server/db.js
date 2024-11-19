require("dotenv").config()
const { query } = require("express");
const { MongoClient } = require('mongodb');

let db


async function connect(){
    if(db) return db

    const client = new MongoClient(process.env.MONGO_CONN)
    db = client.db(process.env.DATABASE)
    return db
}

async function insert(coll, obj) {
        const db = await connect()
        return db.collection(coll).insertOne(obj)
}
async function insertAnotacao(coll, obj, id) {
        const db = await connect()
        return db.collection(coll).updateOne(
            {user : id }, 
            { $push: { "itens": obj }}
        )
}

async function Bool_verifyAllItemsCollection(coll, param, item, user){
    const db = await connect()
    let query = {}
    query[param] = item
    query["user"] = user
    let result = await db.collection(coll).find(query).toArray()
    if (result.length > 0) { return true } else { return false }
}

async function Bool_verifyUserAnotacoes(coll, user){
    const db = await connect()
    let query = {}
    query["user"] = user
    let result = await db.collection(coll).find(query).toArray()
    if (result.length > 0) { return true } else { return false }

}

async function getAllCollection(coll, id){
    const db = await connect()
    let result = await db.collection(coll).find({user: id}).toArray()
    if (result.length > 0) { return result } else { return [] }
}

async function deleteItem(coll, item, user){
    const db = await connect()
    let query = {}
    query["user"] = user
    await db.collection(coll).updateOne(query, { $pull: { itens: { titulo: item }  } })
}

async function updateContent(coll,item, newContent) {
    const db = await connect()
    await db.collection(coll).updateOne(item, newContent)
}

async function getEspecificItem(coll, item = {}){
    const db = await connect()
    return await db.collection(coll).find(item)
}

module.exports = {
    insert,
    Bool_verifyAllItemsCollection,
    getAllCollection,
    deleteItem,
    updateContent,
    getEspecificItem,
    insertAnotacao,
    Bool_verifyUserAnotacoes
}