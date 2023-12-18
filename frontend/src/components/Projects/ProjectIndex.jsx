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

    return (
        <div className="project-index-container">
            <h2>Your Projects</h2>
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
