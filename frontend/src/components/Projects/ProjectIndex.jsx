import "./ProjectIndex.css"
import ProjectIndexItem from "./ProjectIndexItem"
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { fetchProjects, fetchUserProjects, selectProjectsArray } from "../../store/project"

const ProjectIndex = ({user, currentUser, keyword}) => {
    const dispatch = useDispatch()
    const projects = useSelector(selectProjectsArray)
    

    useEffect(()=> {
      if (user) {
        dispatch(fetchUserProjects(user._id))
      } else if (currentUser) {
        dispatch(fetchUserProjects(currentUser._id))
      } else if (keyword) {
        dispatch(fetchProjects(keyword))
      } else {
        dispatch(fetchProjects())
      }

    },[dispatch, user, currentUser, keyword])
 
    
    return (
        <div className="project-index-container">
          {projects.length === 0 ? <h2 className="title">Nothing found for {keyword}</h2> : null}
            <ul className="projects-index-grid">
                {projects.map((project) => (
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
