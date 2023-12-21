import './EditProject.css'

function RecentPicture ({photoUrls, newImage}) {

  const handleClick = (boxName) => {
    if (boxName === 'secondBox') {
      // Clone the current array and add the newImage to the end
      const updatedUrls = [...photoUrls, newImage];
      // Perform any additional logic here if needed
      console.log('Updated URLs:', updatedUrls);
    }
  };

    return (
    <>
      <div className="image-container">
        <div className="image-box" onClick={() => handleClick('firstBox')}>
          Image Box 1
        </div>
        <div className="image-box" onClick={() => handleClick('secondBox')}>
          Image Box 2
          <button onClick={() => handleClick('secondBox')}>
            Star
          </button>
        </div>
      </div>
    </>
    )
}

export default RecentPicture
