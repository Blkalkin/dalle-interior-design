import jwtFetch from "./jwt";


export const getProjects = userId => (
    jwtFetch(`/api/projects/user/${userId}`)
)

export const getProject = projectId => (
    jwtFetch(`/api/project/${projectId}`)
)