import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchProject, selectProject } from "../../store/project"
import './ProjectDetailsShow.css'
import CommentIndex from "../Comments/CommentIndex"
import editIcon from '../../../assets/icons/editIcon.png'
import EditProjectDetails from "./EditProjectDetails"

const ProjectDetailsShow = () => {
    const dispatch = useDispatch()
    const {projectId} = useParams()
    const project = useSelector(selectProject(projectId))
    const photos = project?.photoUrls
    const currUser = useSelector(state => state.session.user)
    const [isCurrUser, setIsCurrUser] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    
    
    
    useEffect(()=> {
        dispatch(fetchProject(projectId))
        if (project?.author === currUser._id) setIsCurrUser(true)
    },[dispatch, projectId, project, currUser])

    const openEditModal =(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(openEdit) return
        setOpenEdit(true)
    }


    if(project) {
        return (
            <div className="project-details-page">
                {openEdit ? <EditProjectDetails public={project.public} title={project.title} description={project.description} projectId={projectId} setOpenEdit={setOpenEdit}/> :
                <>
                    <div className="project-title-PDS title">{project.title}</div>
                    <div className="project-description-PDS text">{project.description}</div>
                    {currUser?._id !== project.author ? 
                        <img onClick={openEditModal} className='edit-PDS' src={editIcon} alt="" />
                        : null}
                </>
                }
               {/* <div className="photos-and-comments-comtainer"> */}
                    <ul className="projects-index-grid-PDS">
                        {photos.map((photo, idx)=> {
                            return (
                                <Link key={idx}>
                                    <img  src={photo} alt="photos" className="photo-PDS" />
                                </Link>
                            );
                        })}
                    </ul> 
                    <div className='comments-area'>
                        <CommentIndex projectId={projectId} />
                    </div>
                </div>
            // </div>
        )
    }
}

export default ProjectDetailsShow