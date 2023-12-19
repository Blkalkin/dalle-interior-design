import jwtFetch from "./jwt";


export const getProjects = () => (
    jwtFetch("/api/projects")
)

export const getProject = projectId => (
    jwtFetch(`/api/project/${projectId}`)
)