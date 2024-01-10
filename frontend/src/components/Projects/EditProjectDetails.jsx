import { useState } from 'react'
import './EditProjectDetails.css'
import { useDispatch } from 'react-redux'
import { editProject } from '../../store/project'

const EditProjectDetails = ({title, description, projectId, setOpenEdit}) => {
    const dispatch = useDispatch()
    const [newTitle, setNewTitle]=useState(title)
    const [newDescription, setNewDescription]= useState(description)

    const updateTitle =(e) => {
        setNewTitle(e.target.value)
    }

    const updateDescription =(e) => {
        setNewDescription(e.target.value)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        e.stopPropagation()

        const editDetails = {
            title: newTitle,
            description: newDescription,
        }
        await dispatch(editProject(projectId, editDetails))
        setOpenEdit(false)
    }

    return (
        <div className='form-container-EPD'>
            <form className='form-EPD'>
                <input 
                    type="text"
                    value={newTitle}
                    onChange={updateTitle} 
                    className='title title-EPD'/>
                <input 
                    type="text"
                    value={newDescription}
                    onChange={updateDescription} 
                    className='text text-EPD'
                    placeholder='add your project description here' />
            </form>
            <button className='cancel-EPD text' onClick={()=> setOpenEdit(false)}>Cancel</button>
            <button className='update-EPD text' onClick={handleSubmit}>Update</button>
        </div>
    )
}

export default EditProjectDetails