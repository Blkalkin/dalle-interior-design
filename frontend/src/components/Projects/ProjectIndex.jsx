import ProjectIndexItem from "./ProjectIndexItem"
import "./ProjectIndex.css"
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getUser } from "../../store/user"
import { fetchProjects, selectProjectsArray } from "../../store/project"

const ProjectIndex = ({title, user}) => {
    const dispatch = useDispatch()
    // const projects = useSelector(selectProjectsArray)

    // useEffect(()=> {
    //     dispatch(fetchProjects())
    // },[dispatch])

    if (!title) title = `${user.username}'s Projects`
    // Placeholder projects
    // for (let i = 1; i < 11; i++) {
    //     projects.push(
    //         {
    //             id: i,
    //             title: `TEST title ${i}`,
    //             description: `TEST description ${i}`
    //         }
    //     )
    // }

    return (
        <div className="project-index-container">
            <h2>{title}</h2>
            <ul className="projects-index">
                {projects.map(project => (
                    <ProjectIndexItem
                        key={project.id}
                        project={project}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ProjectIndex
