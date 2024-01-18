import './LandingPage.css'
import photo0 from '../../../assets/landingPagePhotos/1-livingroom-before.jpeg'
import photo1 from '../../../assets/landingPagePhotos/1-livingroom-after.png'
import photo2 from '../../../assets/landingPagePhotos/2-office-before.jpeg'
import photo3 from '../../../assets/landingPagePhotos/2-office-after.png'
import photo4 from '../../../assets/landingPagePhotos/3-bathroom-before.jpeg'
import photo5 from '../../../assets/landingPagePhotos/3-bathroom-after.png'
import photo6 from '../../../assets/landingPagePhotos/4-kids-room-before.jpeg'
import photo7 from '../../../assets/landingPagePhotos/4-kids-room-after.png'
import { useCallback, useEffect, useState } from 'react';




function LandingPage() {
  const [beforeImg, setBeforeImg] = useState(0)
  const [afterImg, setAfterImg] = useState(1)
  const imagesArr = [photo0, photo1,photo2, photo3, photo4, photo5, photo6, photo7]

  const rotateImg = useCallback(() => {
  const beforeIndex = (beforeImg + 2) % imagesArr.length
  setBeforeImg(beforeIndex);

  const afterIndex = (afterImg + 2) % imagesArr.length
  setAfterImg(afterIndex);
  }, [imagesArr.length, beforeImg, afterImg]);

  useEffect(() => {
  const intervalID = setInterval(rotateImg, 5000);
  return () => clearInterval(intervalID);
  }, [rotateImg])


  return (
    <div className='whole-landing-page'>

      <div className='photos-container'>
        <img className='landing-photo before' src={imagesArr[beforeImg]} alt="before" />
        <img className='landing-photo after' src={imagesArr[afterImg]} alt="after" />
       </div>


    <div className='how-it-works-container text'> How it works
      <div className='welcome-box'>
        <div className='welcome text'>Powered by OpenAI Dall-E 3 & Dall-E 2 </div>
      </div>
      <div className='step-1 steps'>
         <div className='count'>01</div>
         <div className='steps-text text'>Create a new project by uploading your own photo, or start off with one of our demo photos. </div>
      </div>

      <div className='step-2 steps'>
         <div className='count'>02</div>
         <div className='steps-text text'>Choose your vibe... Feeling wild? Go for the creative option. Feeling decisive? Choose the standard option, tell us what/how/where you want your upgrades, the more details the better! </div>
      </div>

      <div className='step-3 steps'>
         <div className='count'>03</div>
         <div className='steps-text text'> {"Star and save the photos you like. One you're satisfied, click done to view your newly created project portfolio"}</div>
      </div>

      <div className='step-4 steps'>
        <div className='count'>04</div>
        <div className='steps-text text'>Share your portfolio to the community! View and comment on projects from your fellow community </div>
      </div>
    </div>

    </div>
  );
  }

export default LandingPage;
