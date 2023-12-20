import { useEffect, useRef, useState } from 'react'
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
        if (errors.length > 0) return
        const payload = {
            photoUrls: [image],
            title: title,
            athorId: currentUserId,
            public: isPublic
        }
        setImageLoading(true);

        const res = dispatch(createProject(payload))
        if (res.ok) {
            setImage(null);
            setTitle('');
            setErrors([]);
            setDisable(true);
            setImageLoading(false)
            navigate(`/profile/${currentUserId}`)
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
                <FilesDragAndDrop setImage={setImage} onUpload={onUpload}/>
                <div className='example-images text'> 
                    <img onClick={()=> handleImg1Click(promptImg1)} src={promptImg1} ref={photo1} className='demo-img' alt="promptImg1" />
                    <img onClick={()=> handleImg2Click(promptImg2)} src={promptImg2} ref={photo2} className='demo-img img2' alt="promptImg2" />
                </div>
                <form className='new-project-form' onSubmit={handleSubmit}>
                    {/* <label> Select a file to upload: </label>
                    <input 
                        className="choose-file-btn" 
                        type="file" 
                        accept="image/*" 
                        onChange={updateImage}/> */}
                    <label className='title-label text'>Name your project:</label>
                    <input 
                        className='title-input' 
                        placeholder="Required" 
                        type="text" 
                        onChange={updateTitle} 
                        value={title}
                        required />
                    <div className='form-btns'>
                        <button className='privacy-btn text' onClick={()=> setIsPublic(!isPublic)}> {isPublic ? "Your project will be public" : "Your project will be private"}</button>
                        <button disabled={disable} className='submit-new-project-btn text' type='submit'>Create </button>
                        {(imageLoading) && <p>Loading...</p>}
                     </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject