import "./CreateProjectModal.css"
import test from '../../components/Projects/images/test1.png'
import test1 from './images/test2.png'
import test3 from './images/test4.png'

const ExampleModal = ({setImage, setPresetInUse}) => {
    const selectImage = (e) => {
        const srcValue = e.target.src;
        setImage(srcValue);
        setPresetInUse(true)
    };

    return (
        <>
            <div className="create-project-modal-right">
                <div className="create-project-modal-content">

                    <div className="create-modal-step-1">
                        <div className="text-ex text">
                            Example Images (Click to Select)
                        </div>
                        <div className="images-container">
                            <img src={test} alt="Error loading" onClick={selectImage}/>
                            <img src={test1} alt="Error loading" onClick={selectImage}/>
                            <img src={test3} alt="Error loading" onClick={selectImage}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExampleModal
