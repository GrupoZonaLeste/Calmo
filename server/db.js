require("dotenv").config()
const {MongoClient} = require("mongodb")

let singleton

async function connect(){
    if(singleton) return singleton

    const client = new MongoClient(process.env.MONGO_CONN)
    await client.connect()
    singleton = client.db(process.env.DATABASE)
    return singleton
}

async function insert(coll, obj) {
    const db = await connect()
    return db.collection(coll).insertOne(obj)
}