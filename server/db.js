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

module.exports = {
    insert
}