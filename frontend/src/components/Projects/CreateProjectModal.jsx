import { useEffect, useRef, useState } from "react"
import "./CreateProjectModal.css"
import FilesDragAndDrop from './FilesDragAndDrop'
import Switch from '@mui/material/Switch';
import { createProject } from "../../store/project";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

const CreateProjectModal = ({setOpenModal, authorId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(true)
    const modalRef = useRef(null)

    const headerTitle = {
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
            <div className="create-project-modal" ref={modalRef} style={step === 3 ? {width: "900px", transitionDuration: "200ms"} : null}>
                <div className="create-project-modal-header">
                    <button onClick={() => setStep(step - 1)}>backstep</button>
                    <h2 className="title">{title[step]}</h2>
                    <button onClick={() => setOpenModal(false)}>close</button>
                    <button onClick={() => setStep(step + 1)}>next</button>
                </div>
                <div className="create-project-modal-content">
                    {step === 1 ? <div className="create-modal-step-1"><FilesDragAndDrop setImage={setImage}/></div> : null}
                    {step === 2 && image ? <div className="create-modal-step-2"><img  src={URL.createObjectURL(image)}></img></div> : null}
                    {step === 3 && image ? 
                    <div className="create-modal-step-3">
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal