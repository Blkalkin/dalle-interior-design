import { useState } from 'react';
import './EditProject.css'

function RecentPicture ({photoUrls, newImage}) {
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
