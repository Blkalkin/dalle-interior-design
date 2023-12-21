import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchProject, selectProject } from "../../store/project"
import './ProjectDetailsShow.css'
import CommentIndex from "../Comments/CommentIndex"
import editIcon from '../../../assets/icons/editIcon.png'

const ProjectDetailsShow = () =>{
    const dispatch = useDispatch()
    const {projectId} = useParams()
    const project = useSelector(selectProject(projectId))
    const photos = project?.photoUrls
    const currUser = useSelector(state => state.session.user)
    const [isCurrUser, setIsCurrUser] = useState(false)

    if(project?.author === currUser._id) {
        setIsCurrUser(true)
    }
    
    useEffect( ()=> {
        dispatch(fetchProject(projectId))
    },[dispatch, projectId])


    console.log(projectId)
    console.log(project, "PROJECT")
    console.log(isCurrUser)


    if(project) {
        return (
            <div className="project-details-page">
               <div className="project-title-PDS title">{project.title}</div>
               <div className="project-description-PDS text">{project.description}</div>
               {currUser._id !== project.author ? 
                 <img className='edit-PDS' src={editIcon} alt="" />
               : null}
               <div className="photos-and-comments-comtainer">
                    <ul className="projects-index-grid-PDS">
                        {photos.map((photo, idx)=> {
                            return (
                                <Link >
                                    <img key={idx} src={photo} alt="photos" className="photo-PDS" />
                                </Link>
                            );
                        })}
                    </ul> 
                    <div className='comments-area'>
                        <CommentIndex />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectDetailsShow