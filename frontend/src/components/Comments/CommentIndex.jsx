import { useDispatch, useSelector} from "react-redux"
import { addComment, fetchComments, selectCommentsArray } from "../../store/comment"
import { useEffect, useState } from "react"
import CommentIndexItem from "./CommentIndexItem"
import "./CommentIndex.css"


const CommentIndex = () => {
    const dispatch = useDispatch()
    const projectId = "658218b08522932af6596a6b"
    const comments = useSelector(selectCommentsArray)
    const currentUser = useSelector(state => state.session.user)
    const [body, setBody] = useState("")

    useEffect(()=> {
        if (projectId){
            dispatch(fetchComments(projectId))
        }
    },[dispatch, projectId])

    const handleSubmit = e => {
        e.preventDefault()
        const payload = {
            authorId: currentUser._id,
            projectId,
            body
        }

        dispatch(addComment(payload))

        setBody("")
    }

    return (
        <ul className="comments-container">
            <h2>Comments</h2>
            <div className="comment-add-container">
                <textarea 
                    id="commentInput" 
                    placeholder="Add a comment..."
                    value={body}
                    onChange={e => setBody(e.target.value)}
                ></textarea>
                <button onClick={handleSubmit}>Comment</button>
            </div>
            
            {comments.map(comment => 
                <CommentIndexItem
                    key={comment._id}
                    comment={comment}
                />
            )}
        </ul>
    )
}

export default CommentIndex