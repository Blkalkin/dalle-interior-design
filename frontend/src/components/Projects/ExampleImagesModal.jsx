import "./CreateProjectModal.css"
import test from './images/test1.png'

const ExampleModal = () => {
    return (
        <>
            <div className="create-project-modal-right">
                <div className="create-project-modal-content">

                    <div className="create-modal-step-1">
                        <div className="text-ex text">
                            Example Images (Drag)
                        </div>
                        <div className="images-container">
                            <img src={test} alt="Error loading" />
                            <img src={test} alt="Error loading" />
                            <img src={test} alt="Error Loading" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExampleModal
