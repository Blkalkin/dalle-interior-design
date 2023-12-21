import { useState } from "react"
import { useDispatch } from "react-redux"
import { editComment } from "../../store/comment"
import "./EditComment.css"

const EditComment = ({body, setOpenEdit, commentId}) => { 
    const dispatch = useDispatch()
    const [newBody, setNewBody]=useState(body)

    const updateBody =(e) => {
        setNewBody(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.stopPropagation()

        const editDetails = {
            body: newBody
        }
        dispatch(editComment(commentId, editDetails))
        setOpenEdit(false)
    }

    return (
        <div className='form-container-EC'>
            <form className='form-EC'>
                <input 
                    type="text"
                    value={newBody}
                    onChange={updateBody} 
                    className='text text-EC'/>
            </form>
            <button className='cancel-EC text' onClick={()=> setOpenEdit(false)}>Cancel</button>
            <button className='update-EC text' onClick={handleSubmit}>Update</button>
        </div>
    )
}


export default EditComment