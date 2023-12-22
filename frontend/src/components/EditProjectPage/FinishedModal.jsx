import { useState } from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../../store/project";
import { useNavigate } from "react-router-dom";



const FinishedModal = ({photoUrls, closeFinishModal, projectId}) => {
    const [description, setDescription] = useState("description");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (event) => {
      setDescription(event.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        description: description
      }
      dispatch(editProject(projectId, payload))
      navigate(`/projectDetails/${projectId}`)
    };

    return (
        <>
          <div className="modal-background">
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeFinishModal}>&times;</span>
                <h2>Finished?</h2>
                <div className="image-gallery">
                  {photoUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Image ${index + 1}`} />
                  ))}
                </div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={description}
                      onChange={handleChange}
                      placeholder="Enter text"
                    />
                    <button type="submit">Done?</button>
                  </form>
              </div>
            </div>
          </div>
        </>
    )
}
export default FinishedModal
