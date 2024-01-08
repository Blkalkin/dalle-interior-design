import { useState } from 'react';
import './EditProject.css'
import ProjectFlowModal from './ProjectFlowModal';
import { removeImage, standardImageEdit, creativeImageEdit } from '../../store/photoGen';
import { addImage, editProject } from '../../store/project';
import { useDispatch } from 'react-redux';

function RecentPicture ({photoUrls, newImages, projectId}) {
    const dispatch = useDispatch()

    const [starFilled, setStarFilled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newPrompt, setNewPrompt] = useState("")
    const [modeSelect, setModeSelect] = useState(false)
    const [mode, setMode] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [tempDisplay, setTempDisplay] = useState(true)

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
        if (!newImages) return
        dispatch(addImage(projectId, {url: newImages.imageGenerated}))
        dispatch(removeImage())
        setTempDisplay(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTempDisplay(true)
        setImageLoading(true)
        let payload;
        switch (mode) {
          case "Standard":
            payload = {
              imagePath: photoUrls[photoUrls.length-1],
              userPrompt: newPrompt
             }
            const standardRes = await dispatch(standardImageEdit(payload))
            if (standardRes) {
              setImageLoading(false)
              setTempDisplay(false)
            }
            console.log(mode)
            break;
          case "Creative":
             payload = {
              imageUrl: photoUrls[photoUrls.length-1],
              promptText: newPrompt
            }
            const creativeRes = dispatch(creativeImageEdit(payload))
            if (creativeRes.ok) {
              setImageLoading(false)
              setTempDisplay(false)
            }
            break
          default:
            break;
        }

    }

    const handleChange = (event) => {
        setNewPrompt(event.target.value);
      };

    const handleModeSelect = e => {
      const field = e.target.innerHTML

      switch (field) {
        case "Standard":
          setModeSelect(true)
          setMode(field)
          break;
        case "Creative":
          setModeSelect(true)
          setMode(field)
          break
        case "Change Mode":
          setModeSelect(false)
          setMode(null)
          setNewPrompt("")
        default:
          break;
      }

    }

    const tempDisplayInfo = () => {
      if (imageLoading) {
        return <img src='https://media.tenor.com/XUIieA-J-vMAAAAi/loading.gif' alt='Image is loading' className='img-size'/>
      } else {
        return <div className='waiting-text text'>Awaiting your next idea!</div>
      }
    }


    return (
        <>
        <div className="image-container">

          <div className="image-box" onClick={() => handleClick('firstBox')}>
            {photoUrls[photoUrls.length-1] && <img src={photoUrls[photoUrls.length-1]} alt={photoUrls[photoUrls.length-1]} />}
          </div>
          <div className="image-box" onClick={() => handleClick('secondBox')}>
            { tempDisplay ? tempDisplayInfo()
            : {newImages} && (
              <>
                <img src={newImages.imageGenerated} alt={newImages.imageGenerated} />
              </>
            )}
          </div>
        </div>
          <label className='text'> Save Image
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
          </label>
        {showModal && <ProjectFlowModal photoUrls={photoUrls} closeModal={closeModal} />}
        {modeSelect ?
          <div>
            <form onSubmit={handleSubmit}>
                <h3>{mode} Edit</h3>
                <div className='mode-select-buttons'>
                <input
                    className='submit-form text'
                    type="text"
                    value={newPrompt}
                    onChange={handleChange}
                    placeholder="What do you want to change about this space?!"
                />
                  <div className='submit-button text'>
                    <button className='text' type="submit">Submit</button>
                  </div>
                </div>
                <div></div>
                <div className='mode-select-buttons'>
                  <button className='text' onClick={handleModeSelect}>Change Mode</button>
                </div>
            </form>
          </div>
        :
          <div className='mode-select-container'>
            <h3 className='mode-text text'>Select editing mode</h3>
            <div className='mode-select-buttons'>
              <button className='text' onClick={handleModeSelect}>Standard</button>
              <div className='space-between'></div>
              <button className='text' onClick={handleModeSelect}>Creative</button>
            </div>
          </div>
        }
      </>
    )
}

export default RecentPicture
