import ProjectIndexItem from "../Projects/ProjectIndexItem";

function CommunityPage () {
    const projects = []
    
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
        <>
            <div className="project-index-container">
                <h2>Community Page</h2>
                <ul className="projects-index">
                    {projects.map(project => (
                        <ProjectIndexItem
                            key={project.id}
                            project={project}
                        />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default CommunityPage;
