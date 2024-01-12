import { useEffect, useRef } from 'react'
import './PhotoModal.css'


const PhotoModal = (props) => {
    const modalRef = useRef(null)

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

      }, [props]);

    return (
        <div className='modal-background'>
            <div className='modal-content' ref={modalRef}>
                <div>
                    <div className='close-container'>
                        <span className="close" onClick={props.closePhotoModal}>&times;</span>
                    </div>
                    <img className='enlarged-photo' src={props.url} alt="" style={props.photoIdx === 0 ? { objectFit: "cover" } : { objectFit: "contain" }}/>
                </div>  
            </div>
        </div>
    )
}

export default PhotoModal;