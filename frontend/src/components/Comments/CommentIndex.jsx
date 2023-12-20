import { useDispatch, useSelector} from "react-redux"
import { fetchComments, selectCommentsArray } from "../../store/comment"
import { useEffect } from "react"
import CommentIndexItem from "./CommentIndexItem"
import "./CommentIndex.css"

const CommentIndex = () => {
    const dispatch = useDispatch()
    const projectId = "658218b08522932af6596a6b"
    const comments = useSelector(selectCommentsArray)

    useEffect(()=> {
        if (projectId){
            dispatch(fetchComments(projectId))
        }
    },[dispatch, projectId])

    return (
        <ul className="comments-container">
            <h2>Comments</h2>
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