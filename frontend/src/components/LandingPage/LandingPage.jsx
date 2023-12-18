import './LandingPage.css'
import photo2 from '../../../assets/landingPagePhotos/1-livingroom-after.png'

import photo1 from '../../../assets/landingPagePhotos/1-livingroom-before.jpeg'
function LandingPage() {
    return (
      <div className='whole-landing-page'>
        
        <div className='photos-container'>
          {/* <div className='before-photos landing-photo'> */}
            <img  className='landing-photo before' src={photo1} alt="before" />
          {/* </div> */}
          {/* <div className='after-photos landing-photo'> */}
            <img className='landing-photo after' src={photo2} alt="after" />
          {/* </div> */}
        </div>

        <div className='how-it-works-container'>
            <div className='step-1'>

            </div>
            <div className='step-2'>

            </div>
            <div className='step 3'>

            </div>
        </div>
        
      </div>
      
    );
  }

  export default LandingPage;
