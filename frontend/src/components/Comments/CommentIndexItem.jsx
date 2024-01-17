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
    const [showDeleteModal, setShowDeleteModal] = useState(false)

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
                <p>{comment.body}</p>
                {currentUserId === author._id ? 
                <div className="edit-links">
                    <p className="text date-PDS">{formattedDate}</p>
                    <img onClick={openEditModal} className='edit-PDS update-PDS' src={editIcon} alt="" />
                    <img onClick={() => setShowDeleteModal(true)} className='edit-PDS' src={deleteIcon} alt="" />
                </div>
                : null }
                { showDeleteModal && <div className='modal-background'>
                    <div className='modal-content text'>
                        <div className='delete-confirmation'>
                            <p className="delete-text">Delete this comment?</p>  
                            <p>
                                <span className='delete-options' onClick={() => dispatch(deleteComment(comment._id))}> Yes &nbsp;&nbsp;&nbsp;&nbsp;</span> 
                                <span className='delete-options' onClick={() => setShowDeleteModal(false)}> No </span> 
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
            }
            
        </li>
    )
}

export default CommentIndexItem