import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchProject, selectProject } from "../../store/project"
import './ProjectDetailsShow.css'
import CommentIndex from "../Comments/CommentIndex"

const ProjectDetailsShow = () =>{
    const dispatch = useDispatch()
    const {projectId} = useParams()
    const project = useSelector(selectProject(projectId))
    const photos = project?.photoUrls
    
    useEffect( ()=> {
        dispatch(fetchProject(projectId))
    },[dispatch, projectId])


    console.log(projectId)
    console.log(project, "PROJECT")
    console.log(photos, "photos")
    // if(!photos) return null 

    if(project) {
        return (
            <div className="project-details-page">
               <div className="project-title-PDS title">{project.title}</div>
               <div className="project-description-PDS text">{project.description}</div>
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