import { useState } from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../../store/project";
import { useNavigate } from "react-router-dom";
import './EditProject.css'


const FinishedModal = ({photoUrls, closeFinishModal, projectId}) => {
    const [description, setDescription] = useState("");
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
      navigate(`/project-details/${projectId}`)
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
                  <form onSubmit={handleSubmit}>

                    <textarea
                      className="text"
                      value={description}
                      onChange={handleChange}
                      placeholder="New Project Description"
                    />
                    <div className="mode-select-buttons">
                      <button type="submit">FINISH</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
export default FinishedModal
