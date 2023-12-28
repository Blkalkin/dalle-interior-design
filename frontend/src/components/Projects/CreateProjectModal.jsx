import { useState } from "react"
import "./CreateProjectModal.css"
import FilesDragAndDrop from './FilesDragAndDrop'

const CreateProjectModal = ({setOpenModal}) => {
    const [step, setStep] = useState(1)
    const [image, setImage] = useState(null)

    const title = {
        1: "Upload Room Image",
        2: "Image Preview",
        3: "Create New Project"
    }

    const handleBackStep = () => {
        switch (step) {
            case 1:
                setOpenModal(false)
                break;
            case 2:
                setImage(null)
                setStep(1)
                break
            case 3:
                setStep(2);
                break
            default:
                break;
        }
    }

    const handleForwardStep = () => {
        switch (step) {
            case 1:
                image ? setStep(2) : null
                break;
            case 2:
                setStep(3)
            case 3:
                break
            default:
                break;
        }
    }

    
    if (image && step === 1) setStep(2)

    return (
        <div className="create-project-background">
            <div className="create-project-modal" style={step === 3 ? {width: "900px"} : null}>
                <div className="create-project-modal-header">
                    <button onClick={handleBackStep}>⬅️</button>
                    <h2 className="title">{title[step]}</h2>
                    <button onClick={handleForwardStep}>next</button>
                </div>
                <div className="create-project-modal-content">
                    {step === 1 ? <div className="create-modal-step-1"><FilesDragAndDrop setImage={setImage}/></div> : null}
                    {step === 2 && image ? <div className="create-modal-step-2"><img  src={URL.createObjectURL(image)}></img></div> : null}
                    {step === 3 && image ? 
                    <div className="create-modal-step-3">
                        <img src={URL.createObjectURL(image)} alt="" />
                        <form>
                            <input type="text" placeholder="Project Title"/>
                            <textarea placeholder="Write a Description(optional)"></textarea>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider"></span>
                            </label>
                        </form>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal