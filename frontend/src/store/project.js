import jwtFetch, { getCookie } from "./jwt";
import { createSelector } from 'reselect';

const RECEIVE_PROJECTS = "RECEIVE_PROJECTS"
const RECEIVE_PROJECT = "RECEIVE_PROJECT"
const REMOVE_PROJECT = "REMOVE_PROJECT"

export const receiveProjects = projects => ({
    type: RECEIVE_PROJECTS,
    projects
})

export const receiveProject = project => ({
    type: RECEIVE_PROJECT,
    project
})

export const removeProject = projectId => ({
    type: REMOVE_PROJECT,
    projectId
})


export const fetchProjects = keyword => async(dispatch) => {
    const path =  keyword ? `/api/projects/?keyword=${keyword}` : "/api/projects"

    try {
        const res = await jwtFetch(path)
        const projects = await res.json()
        dispatch(receiveProjects(projects))
    } catch(err) {
        const data = await err.json()
        throw data
    }
}

export const fetchUserProjects = (userId) => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/projects/user/${userId}`)
        const projects = await res.json()
        return dispatch(receiveProjects(projects))
    } catch(err) {
        const data = await err.json()
        throw data
    }

}

export const fetchProject = projectId => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/projects/${projectId}`)
        const project = await res.json()
        return dispatch(receiveProject(project))
    } catch(err) {
        const res = await err.json()
        throw res
    }
}

export const createProject = project => async(dispatch) => {
    let authToken;
    let data;
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) authToken = 'Bearer ' +  jwtToken;
    
    const res =  await fetch("/api/projects", {
        method: "POST",
        headers:{
            "Authorization": authToken,
            "CSRF-Token": getCookie("CSRF-TOKEN")
        },
        body: project
    });

    if (res.ok) {
        data = await res.json();
        dispatch(receiveProject(data))
        throw data
    } else {
        data = await res.json()
        throw data
    }

}

export const editProject = (projectId, project) => async(dispatch) => {
    try{
        const res =  await jwtFetch(`/api/projects/${projectId}/edit`, {
            method: "PATCH",
            body: JSON.stringify(project)
        });
        const data = await res.json();
        return dispatch(receiveProject(data))
    } catch(err) {
        const res = await err.json();
        throw res
    }
}

export const addImage = (projectId, url) => async(dispatch) => {
    try{
        const res =  await jwtFetch(`/api/projects/${projectId}/save-photo`, {
            method: "PATCH",
            body: JSON.stringify(url)
        });
        const data = await res.json();
        dispatch(receiveProject(data))
        return data
    } catch(err) {
        const res = await err.json();
        throw res
    }
}

export const deleteProject = (projectId) => async(dispatch) => {

    const res = await jwtFetch(`/api/projects/${projectId}`,{
        method: "DELETE"
    })

    if (res.ok){
        dispatch(removeProject(projectId))
    } else {
        const data = await res.json()
        throw data
    }
        
    
}
export const selectProject = projectId => state => state.projects[projectId]
export const selectProjects = state => state.projects

export const selectProjectsArray = createSelector(selectProjects, project =>
    Object.values(project)
)

const projectReducer = (state = {}, action) => {
    const newState = Object.assign({}, state)
    const obj = {}
    switch (action.type) {
        case RECEIVE_PROJECTS:
            for (const project of action.projects){
                obj[project._id] = project;
            }
            return obj
        case RECEIVE_PROJECT:
            newState[action.project._id] = action.project
            return newState
        case REMOVE_PROJECT:
            delete newState[action.projectId]
            return newState
        default:
            return state
    }
}

export default projectReducer
