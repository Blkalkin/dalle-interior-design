import { createProject } from '../../store/project'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FilesDragAndDrop from './FilesDragAndDrop'
import './CreateProject.css'


const CreateProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [isPublic, setIsPublic] = useState("true");
    const [imageLoading, setImageLoading] = useState(false);
    const promptImg1 = "https://images.havenly.com/unsafe/1200x804/filters:quality(50)/https://s3.amazonaws.com/static.havenly.com/prod/assets/boards/2689428/board_2689428_ee033abc";
    const promptImg2 = "https://images.havenly.com/unsafe/800x800/filters:quality(50)/https://s3.amazonaws.com/static.havenly.com/assets/c52f4982-96d3-4026-8689-2712e501fca2";
    const currentUserId = useSelector(state => state.session.user._id);
    const photo1 = useRef()
    const photo2 = useRef()


    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", image)
        formData.append("title", title)
        formData.append("authorId", currentUserId)
        formData.append("public", isPublic)

        setImageLoading(true);
        const res = await dispatch(createProject(formData))
        navigate(`/edit-project/${res._id}`)
    }


    const handleImg1Click = (promptImg) => {
        setImage(promptImg)
        photo1.style.border.red
    }

    const handleImg2Click = (promptImg) => {
        setImage(promptImg)
    }
  
    return (
        <div className='whole-create-project-container'>
            <div className='upload-photo-section'> 
                <FilesDragAndDrop setImage={setImage} />
                <div className='example-images text'> 
                    <img onClick={()=> handleImg1Click(promptImg1)} src={promptImg1} ref={photo1} className='demo-img' alt="promptImg1" />
                    <img onClick={()=> handleImg2Click(promptImg2)} src={promptImg2} ref={photo2} className='demo-img img2' alt="promptImg2" />
                </div>
                <form className='new-project-form' onSubmit={handleSubmit}>
                    <label className='title-label text'>
                        Name your project:
                        <input 
                        className='title-input' 
                        placeholder="Required" 
                        type="text" 
                        onChange={updateTitle} 
                        value={title}
                        required />
                    </label>
                    
                    <div className='form-btns'>
                        <button className='privacy-btn text' onClick={()=> setIsPublic(!isPublic)}> {isPublic ? "Your project will be public" : "Your project will be private"}</button>
                        <button className='submit-new-project-btn text' type='submit'>Create </button>
                        {(imageLoading) && <p>Loading...</p>}
                     </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject