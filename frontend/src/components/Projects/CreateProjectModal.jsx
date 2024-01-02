import { useEffect, useRef, useState } from "react"
import "./CreateProjectModal.css"
import FilesDragAndDrop from './FilesDragAndDrop'
import { createProject } from "../../store/project";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong, faX } from '@fortawesome/free-solid-svg-icons'



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

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setOpenModal(false)
          }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.body.style.overflow = ""
        };

      }, [setOpenModal]);
    
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
                break
            case 3:
                handleForm()
                break
            default:
                break;
        }
    }

    const handleForm = () => {
        const formData = new FormData();
        formData.append("photo", image)
        formData.append("title", title)
        formData.append("authorId", authorId)
        formData.append("public", isPublic)

        const closeModal = (projectId) => {
            navigate(`/edit-project/${projectId}`)
            setOpenModal(false)
        }

        dispatch(createProject(formData)).catch(res =>
            res._id ?  closeModal(res._id) : null
        )
    }

    if (image && step === 1) setStep(2)

    return (
        <div className="create-project-background">
            <div className="create-project-modal" ref={modalRef} style={step === 3 ? {width: "809px"} : null}>
                <div className="create-project-modal-header">
                    <button onClick={handleBackStep}><FontAwesomeIcon size="lg" icon={step === 1 ? faX : faLeftLong} /></button>
                    <h2 className="title">{headerTitle[step]}</h2>
                    <button onClick={handleForwardStep}>{step === 3 ? "Submit" : "Next"}</button>
                </div>
                <div className="create-project-modal-content">
                    {step === 1 ? <div className="create-modal-step-1"><FilesDragAndDrop setImage={setImage}/></div> : null}
                    {step === 2 && image ? <div className="create-modal-step-2"><img  src={URL.createObjectURL(image)}></img></div> : null}
                    {step === 3 && image ? 
                    <div className="create-modal-step-3">
                        <img src={URL.createObjectURL(image)} alt="" />
                        <form onSubmit={e => e.preventDefault()}>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title"/>
                            <textarea 
                                placeholder="Write a Description (optional)"
                                value={description}
                                onChange={e => setDescription(e.target.value)}>
                            </textarea>
                            <p>Setting project public, will allow other users to view your project</p>
                            <div className="switch-container">
                                <label>{isPublic ? "Public" : "Private"}</label>
                                <input type="checkbox" id="check" checked={isPublic} onChange={() => setIsPublic(!isPublic)}/>
                                <label htmlFor="check" className="switch"></label>
                            </div>
                        </form>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal