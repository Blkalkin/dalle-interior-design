import "./CreateProjectModal.css"

const ExampleModal = () => {
    return (
        <>
             <div className="create-project-background">
                <div className="create-project-modal">
                    <div className="create-project-modal-header">
                        {/* <button className="header-icon-btns" onClick={handleBackStep}><FontAwesomeIcon size="lg" icon={step === 1 ? faX : faLeftLong} /></button> */}

                        {/* <h2 className="title">{headerTitle[step]}</h2> */}
                        {/* <button className="text " onClick={handleForwardStep}>{step === 3 ? "Submit" : "Next"}</button> */}
                    </div>
                    <div className="create-project-modal-content">
                        <div className="create-modal-step-1">
                            <h1>Hi</h1>
                            {/* <FilesDragAndDrop setImage={setImage}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExampleModal
