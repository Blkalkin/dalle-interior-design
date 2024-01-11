import { useDispatch, useSelector} from "react-redux"
import { addComment, fetchComments, selectCommentsArray } from "../../store/comment"
import { useEffect, useState } from "react"
import CommentIndexItem from "./CommentIndexItem"
import "./CommentIndex.css"


const CommentIndex = ({project, loggedIn}) => {
    const dispatch = useDispatch()
    let comments = useSelector(selectCommentsArray)
    const currentUser = useSelector(state => state.session.user)
    const [body, setBody] = useState("")
   
    
    function moveCurrentUserToTop(arr, authorId) {
        const index = arr.findIndex(item => item.author._id === authorId);
        
        if (index !== -1) {
            const itemToMove = arr.splice(index, 1)[0];
            arr.unshift(itemToMove);
        } else {
            return arr
        }
        return arr;
    }
    
    if (currentUser) comments = moveCurrentUserToTop(comments, currentUser._id)
    
    
    useEffect(()=> {
        dispatch(fetchComments(project._id))
    },[dispatch, project._id, project, currentUser ])


    const handleSubmit = e => {
        e.preventDefault()
        if (currentUser) {
            const payload = {
                authorId: currentUser._id,
                projectId: project._id,
                body
            }
            dispatch(addComment(payload))
        }
        setBody("")
    }
   

    return (
        <ul className="comments-container">
            {loggedIn ? 
                <div className="comment-add-container">
                    <textarea 
                        className="text"
                        id="commentInput" 
                        placeholder="Add a comment..."
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        ></textarea>
                    <button onClick={handleSubmit} className="title">Comment</button>
                </div>
            : 
              <div className="text">Log in to share your thoughts!</div> }
            
            {comments.map(comment => 
                <CommentIndexItem
                    key={comment._id}
                    comment={comment}
                    currentUserId={currentUser?._id}
                />
            )}
        </ul>
    )

}

export default CommentIndex