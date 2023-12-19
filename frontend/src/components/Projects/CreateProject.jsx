import { useEffect, useState } from 'react'
import './CreateProject.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CreateProject = () => {
    const [errors, setErrors] = useState([])
    const [disable, setDisable] = useState(true)
    const [prompt, setPrompt] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [public, setpublic] = useState(true)
    const [description, setDescription] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const promptImg1 = "https://t4.ftcdn.net/jpg/04/55/10/71/360_F_455107170_36Is8hwPMPdg9fN78WaFiSwY57dkXBu3.jpg"
    const promptImg2 = "https://st.hzcdn.com/simgs/e732d6640e849a40_9-8559/_.jpg"
    const currentUserId = useSelector(state => state.session.user._id)


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updatePrompt = (e) => {
        setPrompt(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) return
        const formData = new FormData();
        formData.append("project[photo]", image);
        formData.append("project[title]", title)
        formData.append("project[description]", description)
        formData.append("project[prompt]", prompt)
        formData.append('project[author]', currentUserId)
        // if (album > 0) formData.append("albums", +album)

        setImageLoading(true);

        const res = await dispatch((formData))
        if (res.ok) {
            setImage(null);
            setPrompt('');
            setTitle('');
            setErrors([]);
            setDisable(true);
            setDescription('');
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



    return (
        <div className='whole-create-project-container'>
            <div className='example-images text'> Test it out with one of these images!
                <img src={promptImg1} className='demo-img' alt="promptImg1" />
                <img src={promptImg2} className='demo-img' alt="promptImg2" />
            </div>
            <div className='upload-photo-section'>
                <div className='drag-n-drop-area'>Drag and drop your photo here! </div>
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
                     <label className='form-label text'>Description</label>
                    <input
                        className='description-input'
                        placeholder="optional"
                        type="text"
                        onChange={updateDescription}
                        value={description} />
                    <label className='form-label text'>Prompt</label>
                    <button >Public</button>
                    <input
                        className=''
                        placeholder="required"
                        type="text"
                        onChange={updatePrompt}
                        value={prompt}
                        required />
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