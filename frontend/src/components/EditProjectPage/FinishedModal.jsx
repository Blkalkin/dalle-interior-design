const FinishedModal = (closeFinishModal) => {
    return (
        <>
        <div className="modal-background">
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeFinishModal}>&times;</span>
            <h2>All Images</h2>
            <div className="image-gallery">
              {photoUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
export default FinishedModal
