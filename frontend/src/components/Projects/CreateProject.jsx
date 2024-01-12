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
    const [image, setImage] = useState();
    const [isPublic, setIsPublic] = useState("true");
    const [photo1Selected, setPhoto1Selected] = useState(false)
    const [photo2Selected, setPhoto2Selected] = useState(false)
    const promptImg1 = "https://images.havenly.com/unsafe/1200x804/filters:quality(50)/https://s3.amazonaws.com/static.havenly.com/prod/assets/boards/2689428/board_2689428_ee033abc";
    const promptImg2 = "https://images.havenly.com/unsafe/800x800/filters:quality(50)/https://s3.amazonaws.com/static.havenly.com/assets/c52f4982-96d3-4026-8689-2712e501fca2";
    const currentUserId = useSelector(state => state.session.user._id);
    const photo1 = useRef(null)
    const photo2 = useRef(null)


    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", image)
        formData.append("title", title)
        formData.append("authorId", currentUserId)
        formData.append("public", isPublic)

        dispatch(createProject(formData)).catch(res =>
            res._id ? navigate(`/edit-project/${res._id}`) : null
        )
        
        
    }


    const handleImg1Click = (img) => {
        const selectedImg = photo1.current;

        if (photo1Selected) {
            setImage()
            selectedImg.classList.remove('highlighted')
            setPhoto1Selected(false)
        } else {
            if (photo2Selected) {
                const img2 = photo2.current;
                img2.classList.remove("highlighted")
            }
            setImage(img) // not sure why setImage is not working
            setPhoto1Selected(true)
            selectedImg.classList.add("highlighted")
        }
    }

    const handleImg2Click = (img) => {
        const selectedImg = photo2.current;

        if (photo2Selected) {
            setImage()
            selectedImg.classList.remove("highlighted")
            setPhoto2Selected(false)
        } else if (!photo2Selected && photo1Selected) {            
            const img1 = photo1.current;
            img1.classList.remove("highlighted")
            setImage(img)
            setPhoto2Selected(true)
            selectedImg.classList.add("highlighted")
        } else if (!photo2Selected) {
            setImage(img)
            setPhoto2Selected(true)
           selectedImg.classList.add("highlighted")
        }
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
                        Give your awesome project a name:
                        <input 
                        className='title-input text' 
                        placeholder="Required" 
                        type="text" 
                        onChange={updateTitle} 
                        value={title}
                        required />
                    </label>
                    
                    <div className='form-btns'>
                        <button className='privacy-btn text' onClick={()=> setIsPublic(!isPublic)}> {isPublic ? "Public" : "Private"}</button>
                        <button className='submit-new-project-btn text' type='submit'>Create </button>
                     </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject