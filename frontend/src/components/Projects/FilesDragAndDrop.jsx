import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Resizer from 'react-image-file-resizer';
import './FilesDragAndDrop.css';

const FilesDragAndDrop = ({ setImage }) => {
  const drop = useRef(null);
  const fileInput = useRef(null);
  const [welcome, setWelcome] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [imgFileOk, setImageFileOk] = useState(true);

  useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('drop', handleDrop);
    drop.current.addEventListener('dragenter', handleDragEnter);
    drop.current.addEventListener('dragleave', handleDragLeave);

  },);

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        'PNG',
        0,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
        maxWidth,
        maxHeight
      );
    });
  };

  const imageToFile = (resizedImage) => {
    const binaryData = atob(resizedImage.split(',')[1]);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    return new File([new Blob([uint8Array], { type: 'image/png' })], 'image.png', { type: 'image/png' });
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    setWelcome(false);
    setImageFileOk(true);

    // Resize the image
    const resizedImage = await resizeImage(file, 1024, 1024);

    // Set the resized image
    setImage(imageToFile(resizedImage));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWelcome(false);
    setImageFileOk(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setWelcome(false);
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

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    if (files.length > 1) {
      setWelcome(false);
      setDragging(false);
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
      setWelcome(false);
      setDragging(false);
      setImageFileOk(false);
      setImage(null);
      return;
    }

    setDragging(false);
    // setFileLoaded(true);
    setWelcome(false);
    setImageFileOk(true);

    // Resize the image
    const resizedImage = await resizeImage(files[0], 1024, 1024);

    // Set the resized image
    setImage(imageToFile(resizedImage));
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
