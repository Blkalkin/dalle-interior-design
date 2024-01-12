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
                <div className="flow-close-container">
                    <div style={{width: "15.97px"}}></div>
                    <h2 className='text'>Looks Good?</h2>
                    <span className="flow-close" onClick={closeFinishModal}>&times;</span>
                </div>
                
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
                      <button className='text finished' type="submit">Finished</button>
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
