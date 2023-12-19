import jwtFetch from "./jwt";


export const getProjects = userId => (
    jwtFetch(`/api/projects/user/${userId}`)
)

export const getProject = projectId => (
    jwtFetch(`/api/project/${projectId}`)
)

export const postProject = project => (
    jwtFetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(project)
    })
)