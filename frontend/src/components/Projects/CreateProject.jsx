import { useState } from 'react'
import './CreateProject.css'


const CreateProject = () => {
    const [promt, setPrompt] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const promptImg1 = "https://t4.ftcdn.net/jpg/04/55/10/71/360_F_455107170_36Is8hwPMPdg9fN78WaFiSwY57dkXBu3.jpg"
    const promptImg2 = "https://st.hzcdn.com/simgs/e732d6640e849a40_9-8559/_.jpg"
    return (
        <div className='whole-create-project-container'>
            <div className='example-images'>
                <img src={promptImg1} className='demo-img' alt="promptImg1" />
                <img src={promptImg2} className='demo-img' alt="promptImg2" />
            </div>
            <div className='upload-photo-section'>
                <div className='drag-n-drop-area'>Drag and drop your photo here! </div>
                <form>
                    <input type="file" />
                </form>
            </div>

        </div>
    )
}

export default CreateProject