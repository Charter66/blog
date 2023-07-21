import {MongoClient} from 'mongodb'

let db;

async function connectToDb (cb){
    const client =new MongoClient('mongodb+srv://blog:blog123@cluster0.fpwtpdm.mongodb.net/');
    await client.connect()
    
    db = client.db('react-blog-db');
    cb()
}
export {
    db,
    connectToDb
}