import { useEffect, useRef } from 'react'
import './PhotoModal.css'


const PhotoModal = (props) => {
    const modalRef = useRef(null)
    console.log("url in modal component: ", props.url)

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.closePhotoModal()
          }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.body.style.overflow = ""
        };

      }, [props.closePhotoModal]);

    return (
        <div className='modal-background'>
            <div className='modal-content' ref={modalRef}>
                <div>
                    <span className="close" onClick={props.closePhotoModal}>&times;</span>
                    <img className='enlarged-photo' src={props.url} alt="" />
                </div>  
            </div>
        </div>
    )
}

export default PhotoModal;