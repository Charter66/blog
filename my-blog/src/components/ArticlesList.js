import { Link } from "react-router-dom";
const ArticlesList = ({articles}) =>{

    return(
        <>
        {articles.map(article=>(
            <div>
            
            <Link key={article.id} className="article-list-item" to={`https://blog-fze5.onrender.coms/articles/${article.name}`}> <h3>{article.title}</h3>
                <p>{article.content[0].substring(0,150)}...</p>
                </Link>
           
           
            </div>
        ))}
        </>
    )
}

export default ArticlesList;