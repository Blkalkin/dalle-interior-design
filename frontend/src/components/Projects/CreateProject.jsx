import { useState } from 'react'
import './CreateProject.css'


const CreateProject = () => {
    const [prompt, setPrompt] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const promptImg1 = "https://t4.ftcdn.net/jpg/04/55/10/71/360_F_455107170_36Is8hwPMPdg9fN78WaFiSwY57dkXBu3.jpg"
    const promptImg2 = "https://st.hzcdn.com/simgs/e732d6640e849a40_9-8559/_.jpg"

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
        formData.append("photo[photo]", image);
        formData.append("photo[title]", title)
        formData.append("photo[description]", description)
        formData.append("photo[tag]", tags)
        formData.append('photo[user_id]', currentUserId)
        // if (album > 0) formData.append("albums", +album)

        setImageLoading(true);

        const res = await dispatch(uploadOnePhoto(formData))
        if (res.ok) {
            setImage(null);
            setTags('');
            setTitle('');
            setErrors([]);
            setDisable(true);
            setDescription('');
            setImageLoading(false)
            navigate(`/photos/${currentUserId}`)
        } 
    }



    return (
        <div className='whole-create-project-container'>
            <div className='example-images'>
                <img src={promptImg1} className='demo-img' alt="promptImg1" />
                <img src={promptImg2} className='demo-img' alt="promptImg2" />
            </div>
            <div className='upload-photo-section'>
                <div className='drag-n-drop-area'>Drag and drop your photo here! </div>
                <form className='new-project-form'>
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
                    <input
                        className=''
                        placeholder="required"
                        type="text"
                        onChange={updatePrompt}
                        value={prompt}
                        required />
               
                </form>
            </div>

        </div>
    )
}

export default CreateProject