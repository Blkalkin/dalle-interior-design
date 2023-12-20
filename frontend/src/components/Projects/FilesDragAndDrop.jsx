import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './FilesDragAndDrop.css'

export default function FilesDragAndDrop({ setImage }) {
    const drop = useRef();
    const [welcome, setWelcome] = useState(true);
    const[moreThanOnePhoto, setMoreThanOnePhoto] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [imgFileOk, setImageFileOk]= useState(true);

    useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
        drop.current.addEventListener('dragenter', handleDragEnter);
        drop.current.addEventListener('dragleave', handleDragLeave);
        
    return () => {
        drop.current.removeEventListener('dragover', handleDragOver);
        drop.current.removeEventListener('drop', handleDrop);
        drop.current.removeEventListener('dragenter', handleDragEnter);
        drop.current.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWelcome(false);
    setFileLoaded(false);
    setMoreThanOnePhoto(false);
    setImageFileOk(true);
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setWelcome(false);
    setFileLoaded(false);
    setMoreThanOnePhoto(false);
    setImageFileOk(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    setImageFileOk(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
   
    let files = [...e.dataTransfer.files];

    if (files.length > 1) {
       setMoreThanOnePhoto(true)
       setWelcome(false)
       setDragging(false);
       files.length = 0
       return
    }

    if (files[0]?.type !== 'image/jpg' && files[0]?.type !== 'image/jpeg' && files[0]?.type !== 'image/png') {
        files.length = 0
        setWelcome(false)
        setFileLoaded(false)
        setDragging(false);
        setImageFileOk(false);
        return;
    }
    // setImage(files)
    setDragging(false);
    setMoreThanOnePhoto(false)
    setFileLoaded(true)
    setWelcome(false)
  };

//   const removeImg = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log(files)
//     files.length = 0
//     console.log(files)
//     setWelcome(true)
//     setMoreThanOnePhoto(false)
//     setFileLoaded(false)
//   }

  return (
    <>
    <div ref={drop} id ='drag-area' className='FilesDragAndDrop FilesDragAndDrop__area' >  
        {welcome ? "Hey, drop me some photos!" : null}
        {moreThanOnePhoto ? "Please select only one photo at a time" :  null}
        {fileLoaded ? "Awesome, we got your photo! " : null}
        {dragging ? "Drop that file down low" : null }
        {!imgFileOk ? "Please upload a png, jpg, or jpeg " : null }
    </div>
    {/* <button onClick={removeImg}>Clear Selected Photo</button> */}
    </>
  );
}

FilesDragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

