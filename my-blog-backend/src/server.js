import express from 'express';	
import {db, connectToDb} from './db.js' 



const app = express();
const PORT = 8000;

app.use(express.json())

app.get('/api/articles/:name', async(req, res) => {
    const {name}=req.params;

    
    const article =await db.collection('articles').findOne({name});


    if(article){
        res.json(article)
    } else {
        res.sendStatus(404).send('Article not found')
    }
    
})

app.put('/api/articles/:name/upvote',  async(req, res)=> {
    const {name} = req.params;
 
    await db.collection('articles').updateOne({name}, {
        $inc:{upvotes:1}
    });
    const article = await db.collection('articles').findOne({name})

   if(article){
    res.json(article)
}else{
    res.send('that article doesnt exist')
}
})

app.post('/api/articles/:name/comments', async (req, res)=> {
    const {name} = req.params;
    const {postedBy , text} =req.body;
    
 

    await db.collection('articles').updateOne({name}, {
        $push: {comments: { postedBy, text}}
    })
    const article = await db.collection('articles').findOne({name})
    if(article){
        res.json(article);
    }else{
        res.send('Not fount')
    }
    
})


app.delete('/api/articles/:name/comments/:postedBy', async (req, res) => {
    const {name, postedBy} = req.params;
    const result = await db.collection('articles').updateOne({name}, {
        $pull: {comments: {postedBy}}
    });

    if(result.modifiedCount === 1){
        const article = await db.collection('articles').findOne({name});
        res.send(article.comments);
    } else {
        res.sendStatus(404);
    }
});

connectToDb(()=>{

    console.log('Succesfully connected to database')

    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    });
    
})
