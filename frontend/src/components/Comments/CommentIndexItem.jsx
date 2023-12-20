import { useDispatch, useSelector } from "react-redux"
import { formatDate } from "../../utils/dateFormat"
import { useEffect } from "react"
import { getUser } from "../../store/user"

const CommentIndexItem = ({comment}) => {
    const dispatch = useDispatch()
    const author = comment.author
    const formattedDate = formatDate(comment.createdAt)


    return (
        <li>
            <h3>{author.username}</h3>
            <p>{formattedDate}</p>
            <p>{comment.body}</p>
        </li>
    )
}

export default CommentIndexItem