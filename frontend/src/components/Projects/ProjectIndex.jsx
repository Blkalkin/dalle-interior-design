import "./ProjectIndex.css"
import ProjectIndexItem from "./ProjectIndexItem"
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { fetchProjects, fetchUserProjects, selectProjectsArray } from "../../store/project"

const ProjectIndex = ({title, user, currentUser}) => {
    const dispatch = useDispatch()
    const projects = useSelector(selectProjectsArray)


    useEffect(()=> {
      if(user) {
          dispatch(fetchUserProjects(user._id))
      } else if (currentUser) {
        dispatch(fetchUserProjects(currentUser._id))
      } else {
        dispatch(fetchProjects())
      }
    },[dispatch, user])
 
    return (
        <div className="project-index-container">
            <h2 className="title project-header">{title}</h2>
            <ul className="projects-index-grid">
                {projects.map((project, idx) => (
                    <ProjectIndexItem
                        key={project._id}
                        project={project}
                        idx={idx}
                        currentUser={currentUser}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ProjectIndex
