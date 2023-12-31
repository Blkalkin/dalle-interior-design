import { useDispatch } from "react-redux"
import { formatDateString } from "../../utils/Helper_Functions"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import "./CommentIndexItem.css"
import { deleteComment } from "../../store/comment";
import editIcon from '../../../assets/icons/editIcon.png'
import deleteIcon from '../../../assets/icons/trash.png'
import { useState } from "react";
import EditComment from "./EditComment";

const CommentIndexItem = ({currentUserId, comment}) => {
    const dispatch = useDispatch()
    const author = comment.author
    const [openEdit, setOpenEdit] = useState(false)
    const formattedDate = formatDateString(comment.createdAt)
    

    const handleDelete = e => {
        e.preventDefault
        dispatch(deleteComment(comment._id))
    }

    const openEditModal =(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(openEdit) return
        setOpenEdit(true)
    }

    return (
        <li className="comment-details">
                <h4>
                <Link to={`/profile/${author._id}`}>
                    <FontAwesomeIcon className="author-icon" icon={faCircleUser} size={"lg"}/>
                    <span className="author-name title">{author?.username}</span>
                </Link>
                </h4>
            {openEdit ? 
                <EditComment body={comment.body} setOpenEdit={setOpenEdit} commentId={comment._id}/> 
                : 
            <div className="comment-body text">
                <p>{formattedDate}</p>
                <p>{comment.body}</p>
                {currentUserId === author._id ? 
                <div className="edit-links">
                    <img onClick={openEditModal} className='edit-PDS' src={editIcon} alt="" />
                    <img onClick={handleDelete} className='edit-PDS' src={deleteIcon} alt="" />
                </div>
                : null }
            </div>
            }
            
        </li>
    )
}

export default CommentIndexItem