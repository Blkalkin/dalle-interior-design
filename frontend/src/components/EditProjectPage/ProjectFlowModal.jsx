import './EditProject.css'

const ProjectFlowModal = ({ photoUrls, closeModal }) => {
    return (
        <div className="modal-background">
        <div className="modal">
          <div className="modal-content">
            <div className="flow-close-container">
              <div style={{width: "15.97px"}}></div>
              <h2>Images</h2>
              <span  className='flow-close' onClick={closeModal}>&times;</span>
            </div>
            <div className="image-gallery">
              {photoUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProjectFlowModal;
