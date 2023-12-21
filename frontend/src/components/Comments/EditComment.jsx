import { useState } from "react"
import { useDispatch } from "react-redux"

const EditComment = ({body, setOpenEdit, commentId}) => { 
    const dispatch = useDispatch()
    const [newBody, setNewBody]=useState(body)

    const updateBody =(e) => {
        setNewBody(e.target.value)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        e.stopPropagation()

        const editDetails = {
            body: newBody
        }
        await dispatch(editProject(commentId, editDetails))
        setOpenEdit(false)
    }

    return (
        <div className='form-container-EPD'>
            <form className='form-EPD'>
                <input 
                    type="text"
                    value={newBody}
                    onChange={updateBody} 
                    className='text text-EPD'/>
            </form>
            <button className='cancel-EPD text' onClick={()=> setOpenEdit(false)}>Cancel</button>
            <button className='update-EPD text' onClick={handleSubmit}>Update</button>
        </div>
    )
}


export default EditComment