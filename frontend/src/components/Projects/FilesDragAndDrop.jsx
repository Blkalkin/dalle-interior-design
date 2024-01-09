// FilesDragAndDrop.jsx
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './FilesDragAndDrop.css';

const FilesDragAndDrop = ({ setImage }) => {
  const drop = useRef(null);
  const fileInput = useRef(null);
  const [welcome, setWelcome] = useState(true);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imgFileOk, setImageFileOk] = useState(true);


  useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('drop', handleDrop);
    drop.current.addEventListener('dragenter', handleDragEnter);
    drop.current.addEventListener('dragleave', handleDragLeave);

    // Clean up event listeners
    // return () => {
    //   drop.current.removeEventListener('dragover', handleDragOver);
    //   drop.current.removeEventListener('drop', handleDrop);
    //   drop.current.removeEventListener('dragenter', handleDragEnter);
    //   drop.current.removeEventListener('dragleave', handleDragLeave);
    // };
  },);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFileLoaded(true);
    setWelcome(false);
    setImageFileOk(true);
    setImage(file)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWelcome(false);
    setFileLoaded(false);
    setImageFileOk(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setWelcome(false);
    setFileLoaded(false);
    setImageFileOk(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    setImageFileOk(true);
    setWelcome(true)
    setImage(null)
  };

  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files;
    
    files = [...e.dataTransfer.files];

    if (files.length > 1) {
      setWelcome(false);
      setDragging(false);
      setFileLoaded(false);
      setImageFileOk(false);
      setImage(null)
      files.length = 0;
      return;
    }

    if (
      files[0]?.type !== 'image/jpg' &&
      files[0]?.type !== 'image/jpeg' &&
      files[0]?.type !== 'image/png'
    ) {
      files.length = 0;
      setWelcome(false);
      setFileLoaded(false);
      setDragging(false);
      setImageFileOk(false);
      setImage(null)
      return;
    }

    setDragging(false);
    setFileLoaded(true);
    setWelcome(false);
    setImageFileOk(true);


    setImage(files[0]);
  };

  return (
      <div ref={drop} id='drag-area'  
        className='FilesDragAndDrop FilesDragAndDrop__area'
        onClick={() => fileInput.current.click()}
      >
        {welcome ? (
            <div className='drop-text'>
                <span>Hey, drop me a photo here!</span>
            </div>
        ) : null}
        {dragging ? 'Drop that file down low' : null}
        {!imgFileOk ? 'Please upload a png, jpg, or jpeg ' : null}
        <input
          ref={fileInput}
          type='file'
          accept='image/*'
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>
  );
};

FilesDragAndDrop.propTypes = {
  setImage: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FilesDragAndDrop;
