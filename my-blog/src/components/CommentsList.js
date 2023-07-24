import React, {useState, useEffect,useParams} from "react"
import axios from "axios"

const url ='https://blog-fze5.onrender.com/api/articles/:name'

const CommentsList = ({comments}) => {

        const[comment, setComment] = useState(null)
        useEffect(() => {
                axios.get(url).then((response) =>{
                    setComment(response.data)
                } )
            }, [])
     
console.log(comment)

    return(
       <>
        <h3>Comments:</h3>
            {comment && comment.map(comments => (
                <div className="comments" key = {comments.postedBy + ': ' + comments.text} >
                    <h4>{comments.postedBy}</h4>
                    <p>{comments.text}</p>
                </div>
            ))}
    </>
            )
}

export default CommentsList;