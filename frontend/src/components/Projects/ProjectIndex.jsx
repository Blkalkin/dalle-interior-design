import "./ProjectIndex.css"
import ProjectIndexItem from "./ProjectIndexItem"
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { fetchProjects, fetchUserProjects, selectProjectsArray } from "../../store/project"

const ProjectIndex = ({title, user}) => {
    const dispatch = useDispatch()
    const projects = useSelector(selectProjectsArray)
    console.log(user._id)
    useEffect(()=> {
        // dispatch(fetchProjects())
        dispatch(fetchUserProjects(user._id))
    },[dispatch, user._id])

    if (!title) title = `${user.username}'s Projects`
 
    return (
        <div className="project-index-container">
            <h2 className="title project-header">{user.username}'s Projects</h2>
            <ul className="projects-index-grid">
                {projects.map(project => (
                    <ProjectIndexItem
                        key={project._id}
                        project={project}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ProjectIndex
