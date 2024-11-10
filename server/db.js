require("dotenv").config()
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

async function Bool_verifyAllItemsCollection(coll, param, item){
    const db = await connect()
    let query = {}
    query[param] = item
    let result = await db.collection(coll).find(query).toArray()
    if (result.length > 0) { return true } else { return false }
}

async function getAllCollection(coll){
    const db = await connect()
    let result = await db.collection(coll).find({}).toArray()
    if (result.length > 0) { return result } else { return [] }
}

module.exports = {
    insert,
    Bool_verifyAllItemsCollection,
    getAllCollection
}