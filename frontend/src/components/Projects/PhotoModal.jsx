import './PhotoModal.css'


const PhotoModal = (props) => {
    console.log("url in modal component: ", props.url)
    return (
        <div className='modal-background'>
            <div className='modal-content'>
                <div>
                    <span className="close" onClick={props.closePhotoModal}>&times;</span>
                    <img className='enlarged-photo' src={props.url} alt="" />
                </div>  
            </div>
        </div>
    )
}

export default PhotoModal;