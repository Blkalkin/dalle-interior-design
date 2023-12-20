import { useDispatch, useSelector } from "react-redux"
import { formatDate } from "../../utils/dateFormat"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import "./CommentIndexItem.css"
import { deleteComment } from "../../store/comment";

const CommentIndexItem = ({currentUserId, comment}) => {
    const dispatch = useDispatch()
    const author = comment.author
    const formattedDate = formatDate(comment.createdAt)

    const handleDelete = e => {
        e.preventDefault
        dispatch(deleteComment(comment._id))
    }
    
    return (
        <li className="comment-details">
            <Link to={`/profile/${author._id}`}>
                <h4>
                    <FontAwesomeIcon className="author-icon" icon={faCircleUser} size={"lg"}/>
                    <span className="author-name">{author?.username}</span>
                </h4>
            </Link>
            <div className="comment-body">
                <p>{formattedDate}</p>
                <p>{comment.body}</p>
                {currentUserId === author._id ? ( <button onClick={handleDelete}>Delete</button> ): null }
            </div>
            
        </li>
    )
}

export default CommentIndexItem