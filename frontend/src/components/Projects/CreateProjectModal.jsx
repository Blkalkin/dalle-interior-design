import { useState } from "react"
import "./CreateProjectModal.css"
import FilesDragAndDrop from './FilesDragAndDrop'

const CreateProjectModal = ({setOpenModal}) => {
    const [step, setStep] = useState(1)
    const [image, setImage] = useState(null)

    const title = {
        1: "Upload Room Image",
        2: "Use this Image?",
        3: "Create Project"
    }


    return (
        <div className="create-project-background">
            <div className="create-project-modal" style={step === 3 ? {width: "900px"} : null}>
                <div className="create-project-modal-header">
                    <button onClick={() => setStep(step - 1)}>backstep</button>
                    <h2 className="title">{title[step]}</h2>
                    <button onClick={() => setOpenModal(false)}>close</button>
                    <button onClick={() => setStep(step + 1)}>next</button>
                </div>
                <div className="create-project-modal-content">
                    {step === 1 ? <div className="create-modal-step-1"><FilesDragAndDrop setImage={setImage}/> </div> : null}
                    {step === 2 ? <div className="create-modal-step-2"><img  src={URL.createObjectURL(image)}></img></div> : null}
                    {step === 3 ? 
                    <div className="create-modal-step-3">
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal