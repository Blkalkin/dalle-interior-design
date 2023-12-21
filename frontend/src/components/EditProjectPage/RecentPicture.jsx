import { useState } from 'react';
import './EditProject.css'
import ProjectFlowModal from './ProjectFlowModal';
import { editImage } from '../../store/photoGen';
import { editProject } from '../../store/project';
import { useDispatch } from 'react-redux';




function RecentPicture ({photoUrls, newImages = "", projectId}) {
    const dispatch = useDispatch()

    const [starFilled, setStarFilled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newPrompt, setNewPrompt] = useState("")

    const handleClick = (boxName) => {
        if (boxName === 'firstBox') {
            //open modal to view all images in photoUrls
            setShowModal(true);
        } else if (boxName === 'secondBox') {
            // open modal to view image better
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleStarHover = (isHovered) => {
        setStarFilled(isHovered);
    };

    const handleSavingImage = () => {
        // const photoUrls = [...photoUrls, newImage];
        // this should generate the new image
        const newUrls = [...photoUrls, newImages];
        const payload = {
            photoUrls: newUrls
        }
        dispatch(editProject(projectId, payload))
        setStarFilled(!starFilled);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            // imagePath: photoUrls[photoUrls.length-1],
            imagePath: '/Users/Dylan/aa-projects/dalle-interior-design/backend/image_generation/sample-images/office.png',
            userPrompt: newPrompt
        }
        dispatch(editImage(payload))
        // console.log(newImages)
    }

    const handleChange = (event) => {
        setNewPrompt(event.target.value);
      };

    return (
        <>
        <div className="image-container">
          <div className="image-box" onClick={() => handleClick('firstBox')}>
            {photoUrls[photoUrls.length-1] && <img src={photoUrls[photoUrls.length-1]} alt={photoUrls[photoUrls.length-1]} />}
          </div>
          <div className="image-box" onClick={() => handleClick('secondBox')}>
            {{newImages} && (
              <>
                <img src={newImages} alt={newImages} />
                <svg
                  className="star-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={starFilled ? 'gold' : 'none'}
                  onMouseEnter={() => handleStarHover(!starFilled)}
                  onClick={() => handleSavingImage()}
                >
                  <path d="M12 2l2.591 7.82H22l-6.711 4.872 2.591 7.82L12 17.64l-6.879 4.872 2.591-7.82L2 9.82h7.409L12 2z"/>
                </svg>
              </>
            )}
          </div>
        </div>
        {showModal && <ProjectFlowModal photoUrls={photoUrls} closeModal={closeModal} />}
        <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={newPrompt}
                            onChange={handleChange}
                            placeholder="Enter text"
                        />
                        <button type="submit">Submit</button>
                    </form>
      </>
    )
}

export default RecentPicture
