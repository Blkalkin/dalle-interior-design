import ProjectIndexItem from "./ProjectIndexItem"
import "./ProjectIndex.css"

const ProjectIndex = () => {
    const projects = []

    // Placeholder projects
    for (let i = 1; i < 11; i++) {
        projects.push(
            {
                id: i,
                title: `TEST title ${i}`,
                description: `TEST description ${i}`
            }
        )
        
    }
    console.log(projects)
    return (
        <ul className="project-index-container">
            {projects.map(project => (
                <ProjectIndexItem
                    key={project.id}
                    project={project}
                />
            ))}
        </ul>
    )
}

export default ProjectIndex
