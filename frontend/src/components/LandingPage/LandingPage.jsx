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
      <div className='step-1 steps'>
         <div className='count'>01</div>
         <div className='steps-text text'>Create a new project by uploading your photo, or get started with one of our sample images</div>
      </div>

      <div className='step-2 steps'>
         <div className='count'>02</div>
         <div className='steps-text text'>Decide your vibe! Design your room/photo using our Creative or Standard mode, up to 50 edits per day!</div>
      </div>

      <div className='step-3 steps'>
         <div className='count'>03</div>
         <div className='steps-text text'>Once you're satisfied with your results, click to save your project and view it in your project portfolio </div>
      </div>

      <div className='step 3 steps'>
        <div className='count'>04</div>
        <div className='steps-text text'>Check out other projects! View and comment on fellow projects from the Roominate community </div>
      </div>
    </div>

    </div>
  );
  }

export default LandingPage;
