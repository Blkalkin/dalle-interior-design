import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchProject, selectProject } from "../../store/project"
import './ProjectDetailsShow.css'

const ProjectDetailsShow = () =>{
    const dispatch = useDispatch()
    const {projectId} = useParams()
    const project = useSelector(selectProject(projectId))
    const photos = project.photoUrls
    
    useEffect( ()=> {
        dispatch(fetchProject(projectId))
    },[dispatch, projectId])

    return (
    
    <div className="project-details-page">
        <div className="project-title-PDS title">{project.title}</div>
        <div className="project-description-PDS text">{project.description}</div>
        <ul className="projects-index-grid-DS">
            {photos.map((photo, idx)  => {
                return (
                    <Link className="photoImage" to={`/projects/${projectId}/${photo}`}>
                        <img key={idx} src={photo} alt="photo" />
                    </Link>
                );
            })}
        </ul>
    </div>
    )
}

export default ProjectDetailsShow