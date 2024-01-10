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

    // return () => {
    //   drop.current.removeEventListener('dragover', handleDragOver);
    //   drop.current.removeEventListener('drop', handleDrop);
    //   drop.current.removeEventListener('dragenter', handleDragEnter);
    //   drop.current.removeEventListener('dragleave', handleDragLeave);
    // };
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFileLoaded(true);
    setWelcome(false);
    setImageFileOk(true);
    setImage(file);
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
    setWelcome(true);
    setImage(null);
  };

  const resizeImage = (image, maxWidth, maxHeight) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Calculate new dimensions while maintaining aspect ratio
    let newWidth, newHeight;
    if (image.width > image.height) {
      newWidth = maxWidth;
      newHeight = (maxWidth / image.width) * image.height;
    } else {
      newHeight = maxHeight;
      newWidth = (maxHeight / image.height) * image.width;
    }

    // Set canvas dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw image onto canvas
    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    // Convert canvas back to image
    const resizedImage = new Image();
    resizedImage.src = canvas.toDataURL('image/png');

    return resizedImage;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    if (files.length > 1) {
      setWelcome(false);
      setDragging(false);
      setFileLoaded(false);
      setImageFileOk(false);
      setImage(null);
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
      setImage(null);
      return;
    }

    setDragging(false);
    setFileLoaded(true);
    setWelcome(false);
    setImageFileOk(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      const resizedImage = resizeImage(image, 1024, 1024);

      setImage(resizedImage);
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <div
      ref={drop}
      id="drag-area"
      className="FilesDragAndDrop FilesDragAndDrop__area"
      onClick={() => fileInput.current.click()}
    >
      {welcome ? (
        <div className="drop-text">
          <span>Hey, drop me a photo here!</span>
        </div>
      ) : null}
      {dragging ? 'Drop that file down low' : null}
      {!imgFileOk ? 'Please upload a png, jpg, or jpeg ' : null}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
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
