import {useParams} from 'react-router-dom'
import articles from './article-content'
import NotFoundPage from './NotFoundPage'
import {useState, useEffect} from 'react'
import axios from 'axios'
import CommentsList from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm'
import useUser from '../hooks/useUser'



const ArticlePage = () =>{
    const[articleInfo, setArticleInfo]=useState({upvotes : 0 , comments : [], canUpvote : false})
    const { canUpvote} =articleInfo;
    const {articleId} = useParams();
    const article = articles.find(article =>article.name === articleId);
    const {user, isLoading} = useUser();
    const [articleComments, setArticleComments] = useState ([])
    useEffect (() => {
        const loadArticleInfo = async () => {
        let token = user && await user.getIdToken();
        const headers = token ? {authToken: token} : {};
        const response = await axios.get(`https://blog-fze5.onrender.com/api/articles/${articleId}/comments`, {headers})
        const newArticleComments =response.data;
         setArticleComments(newArticleComments);
         console.log("new",newArticleComments)
        }
         if(!isLoading){
            loadArticleInfo()

         }

     },[]);

     console.log("article",articleComments)
     useEffect (() => {
        const loadArticleInfo = async () => {
        let token = user && await user.getIdToken();
        const headers = token ? {authToken: token} : {};
        const response = await axios.get(`/api/articles/${articleId}`, {headers})
        const newArticleInfo =response.data;
         setArticleInfo(newArticleInfo);
        }
         if(!isLoading){
            loadArticleInfo()

         }

     },[isLoading, user, articleId]);
console.log(articleInfo)
     const addUpvote = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? {authToken: token} : {};

            const response = await axios.put(`https://blog-fze5.onrender.com/api/articles/${articleId}/upvote`, null, {headers}) 
            const updatedArticle = response.data;
            setArticleInfo(updatedArticle);
     }
    console.log(articleInfo)

     if(!article){
            return <NotFoundPage/>
     }
     return(
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
        {user ? <button onClick={addUpvote}>{canUpvote ? 'Upvote'  : 'Already Upvoted'}</button> 
        : <button>Log in to upvote</button> }    
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) =>(
            <p key={i}>{paragraph}</p>
            
        ))}
        {user 
        ? <AddCommentForm 
        articleName={articleId}
        onArticleUpdated={updatedArticle=>setArticleInfo(updatedArticle)}
         /> : <button>Log in to add a comment</button> } 
       {articleInfo &&   <CommentsList comments={articleInfo.comments} articleId={articleId} />}
        </>
    
    )
}

export default ArticlePage;