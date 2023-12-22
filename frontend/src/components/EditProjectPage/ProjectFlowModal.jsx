const ProjectFlowModal = ({ photoUrls, closeModal }) => {
    return (
        <div className="modal-background">
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Images</h2>
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
