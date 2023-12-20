import { useEffect, useState } from 'react'
import './CreateProject.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../store/project'
import FilesDragAndDrop from './FilesDragAndDrop'


const CreateProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [disable, setDisable] = useState(true);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [isPublic, setIsPublic] = useState("true");
    const [imageLoading, setImageLoading] = useState(false);
    const promptImg1 = "https://t4.ftcdn.net/jpg/04/55/10/71/360_F_455107170_36Is8hwPMPdg9fN78WaFiSwY57dkXBu3.jpg";
    const promptImg2 = "https://st.hzcdn.com/simgs/e732d6640e849a40_9-8559/_.jpg";
    const currentUserId = useSelector(state => state.session.user._id);


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) return
        const payload = {
            photoUrls: ['https://cdn.sanity.io/images/32lej2m6/production/3b2719424a0b4b4a1bdd5c5fc6a0720a72cac601-1280x720.jpg?auto=format'],
            title: title,
            athorId: currentUserId,
            public: true
        }
        // console.log(formData)
        setImageLoading(true);

        const res = dispatch(createProject(payload))
        if (res.ok) {
            setImage(null);
            setTitle('');
            setErrors([]);
            setDisable(true);
            setImageLoading(false)
            navigate(`/photos/${currentUserId}`)
        } 
    }

    useEffect(() => {
        const errors = []
        if (image) {
            if (image?.type !== 'image/jpg' && image?.type !== 'image/jpeg' && image?.type !== 'image/png') errors.push('File Type Not Supported. Please upload a png, jpg, or jpeg')
            setTitle(image.name.split('.')[0])

        } else setTitle('')
        if (!image) errors.push('Please upload image to continue')
        if (errors.length > 0) setDisable(true)
        if (errors.length === 0) setDisable(false)
        setErrors(errors)

    }, [image, disable])

    const onUpload = (files) => {
        console.log(files);
        setImage(files[0])

    }

    return (
        <div className='whole-create-project-container'>
            <div className='example-images text'> Get started with one of these images, or upload
                <img onClick={()=> setImage(promptImg1)} src={promptImg1} className='demo-img' alt="promptImg1" />
                <img onClick={()=> setImage(promptImg2)}src={promptImg2} className='demo-img' alt="promptImg2" />
            </div>
            <div className='upload-photo-section'> 
                <FilesDragAndDrop setImage={setImage} onUpload={onUpload}/>
                <form className='new-project-form' onSubmit={handleSubmit}>
                    <input 
                        className="" 
                        type="file" 
                        accept="image/*" 
                        onChange={updateImage}/>
                    <label className='form-label text'>Project Title</label>
                    <input 
                        className='title-input' 
                        placeholder="Required" 
                        type="text" 
                        onChange={updateTitle} 
                        value={title}
                        required />
                    <button onClick={()=> setIsPublic(false)}> {isPublic ? "Set Project as Private" : "Set Project as Pubic"}</button>
                    <div className='submit-new-project'>
                        <button disabled={disable} className='sign-up-submit-button' type='submit'>Create </button>
                    {(imageLoading) && <p>Loading...</p>}
                </div>
                </form>
            </div>

        </div>
    )
}

export default CreateProject