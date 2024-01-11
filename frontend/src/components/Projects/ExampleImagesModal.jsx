import "./CreateProjectModal.css"

const ExampleModal = () => {
    return (
        <>
            <div className="create-project-modal-right">
                <div className="create-project-modal-content">
                    <div className="create-modal-step-1">
                        <div className="text">
                            Example Images (Drag)
                        </div>
                        <ul className="example-image-list">
                            <img src="../images/test1.png" alt="" />
                            <img src="../images/test1.png" alt="Example 2" />
                            <img src="images/test1.png" alt="" />
                            {/* Add more examples as needed */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExampleModal
