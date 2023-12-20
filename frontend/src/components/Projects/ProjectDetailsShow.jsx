import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProject, selectProject } from "../../store/project"

const ProjectDetailsShow = () =>{
    const dispatch = useDispatch()
    const {projectId} = useParams()
    // const project = useSelector(selectProject(projectId))
    // const projectPhotos = project.photoUrls

    // console.log(project)
    // useEffect(()=> {
    //     dispatch(fetchProject(projectId))
    // },[dispatch])


    return (
    
    <div className="project-details-page">
        <div>
            <div className="title">Title</div>
            <div className="text">Description</div>
        </div>
        <ul className="projects-index-grid">
            {projectPhotos.map(photo,idx  => {
                return (
                <div key={idx}>
                    <Link to={`/projects/${projectId}/${photo}`}>
                         <img key={idx} src={photo} alt="photo" className="photoImage" />
                    </Link>
                </div>
                );
            })}
        </ul>

    </div>

    )
}

export default ProjectDetailsShow