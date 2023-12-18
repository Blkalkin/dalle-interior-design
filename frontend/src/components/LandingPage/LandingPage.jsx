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

        <div className='how-it-works-container text'> How it works
            <div className='step-1 steps'>
              <div className='count'>01</div>
              <div className='steps-text text'>Create a new project by uploading a photo</div>

            </div>
            <div className='step-2 steps'>
              <div className='count'>02</div>
              <div className='steps-text text'>Make edits to your photo. Save the photos you like inside your project portfolio</div>

            </div>
            <div className='step 3 steps'>
              <div className='count'>03</div>
              <div className='steps-text text'>Share your portfolio to the community! View and comment on projects from your fellow community </div>

            </div>
        </div>
        
      </div>
      
    );
  }

  export default LandingPage;
