import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchProject, selectProject } from "../../store/project"
import './ProjectDetailsShow.css'
import CommentIndex from "../Comments/CommentIndex"
import editIcon from '../../../assets/icons/editIcon.png'
import EditProjectDetails from "./EditProjectDetails"
import PhotoModal from "./PhotoModal";

const ProjectDetailsShow = () => {
    const dispatch = useDispatch()
    const {projectId} = useParams()
    const project = useSelector(selectProject(projectId))
    const photos = project?.photoUrls
    const currUser = useSelector(state => state.session.user)
    const isCurrUser = currUser && currUser._id === project?.author._id
    const [openEdit, setOpenEdit] = useState(false)
    const [showPhotoModal, setShowPhotoModal] = useState(false)
    const [photoUrl, setPhotoUrl] = useState('')
    const [photoIdx, setPhotoIdx] = useState(null)

    
    useEffect(()=> {
        dispatch(fetchProject(projectId))
    },[dispatch, projectId, currUser, openEdit])

    const openEditModal =(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(openEdit) return
        setOpenEdit(true)
    }

    const closePhotoModal = () => {
        setShowPhotoModal(false);
    };

    const enlargePhoto = (url, idx) => {
        setShowPhotoModal(true);
        setPhotoUrl(url);
        setPhotoIdx(idx)
    }

    if (project) {

        return (
            <div className="project-details-page">
                {openEdit ? <EditProjectDetails public={project.public} title={project.title} description={project.description} projectId={projectId} setOpenEdit={setOpenEdit}/> :
                <>
                    <div className="project-title-PDS title">{project.title}</div>
                    <div className="project-description-PDS text">{project.description}</div>
                    {isCurrUser ? 
                        <img onClick={openEditModal} className='edit-PDS' src={editIcon} alt="" />
                        : null}
                </>
                }
               <div className="photos-and-comments-container">
                    <div>
                        <ul className="projects-index-grid-PDS">
                            {showPhotoModal && < PhotoModal url={photoUrl} closePhotoModal={closePhotoModal} photoIdx={photoIdx}/>}
                            {photos.map((photo, idx) => 
                                <li key={idx} className="photo-PDS">
                                    <Link onClick={() => enlargePhoto(photo, idx)} >
                                        <img src={photo} alt="photos" />
                                    </Link>
                                </li>
                            )}
                        </ul> 
                    </div>
                    <div className='comments-area'>
                        {currUser ? 
                         <h2 className="title comments-title">
                            Share your thoughts on <Link to={`/profile/${project.author._id}`} className="user-link title"><span>{`${project.author.username}'s`}</span></Link> project:
                        </h2> 
                         : <h2 className="title comments-title">{`Comments on ${project.author.username}'s project:`}</h2>
                        }
                
                        <CommentIndex project={project} loggedIn={currUser} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectDetailsShow