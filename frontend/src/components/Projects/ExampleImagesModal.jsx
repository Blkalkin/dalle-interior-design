import "./CreateProjectModal.css"
import test from '../../components/Projects/images/test1.png'
import test1 from './images/test2.png'
import test2 from './images/test3.png'

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
                            <img src={test1} alt="Error loading" />
                            <img src={test2} alt="Error Loading" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExampleModal
