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
    const isCurrUser = currUser && currUser._id === project?.author._id
    const [openEdit, setOpenEdit] = useState(false)

    
    useEffect(()=> {
        if (!project){
            dispatch(fetchProject(projectId))
        }
    },[dispatch, projectId, project])

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
                    {isCurrUser ? 
                        <img onClick={openEditModal} className='edit-PDS' src={editIcon} alt="" />
                        : null}
                </>
                }
               <div className="photos-and-comments-container">
                    <ul className="projects-index-grid-PDS">
                        {photos.map((photo, idx) => 
                            <li key={idx} className="photo-PDS">
                                <Link >
                                    <img  src={photo} alt="photos"/>
                                </Link>
                            </li>
                        )}
                    </ul> 
                    <div className='comments-area'>
                        <CommentIndex project={project} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectDetailsShow