import jwtFetch, { getCookie } from "./jwt";
import { createSelector } from 'reselect';

const RECEIVE_PROJECTS = "RECEIVE_PROJECTS"
const RECEIVE_PROJECT = "RECEIVE_PROJECT"
const RECEIVE_UPDATED_PROJECT = "RECEIVE_UPDATED_PROJECT"
const REMOVE_PROJECT = "REMOVE_PROJECT"

export const receiveProjects = projects => ({
    type: RECEIVE_PROJECTS,
    projects
})

export const receiveProject = project => ({
    type: RECEIVE_PROJECT,
    project
})

export const receiveUpdatedProject = project => ({
    type: RECEIVE_UPDATED_PROJECT,
    project
})

export const removeProject = projectId => ({
    type: REMOVE_PROJECT,
    projectId
})

export const fetchProjects = () => async(dispatch) => {
    try {
        const res = await jwtFetch("/api/projects")
        const projects = await res.json()
        return dispatch(receiveProjects(projects))
    } catch(err) {
        const data = await err.json()
        console.log(data)
    }
}

export const fetchUserProjects = (userId) => async(dispatch) => {
    try {
        const res = jwtFetch(`/api/projects/user/${userId}`)
        const projects = await res.json()
        console.log(projects, "is this hitting? ")
        return dispatch(receiveProjects(projects))
    } catch(err) {
        // console.log(err, "err inside the fetch")
        const data = await err.json()
        console.log(data)
    }
    
}

export const fetchProject = projectId => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/projects/${projectId}`)
        const project = await res.json()
        return dispatch(receiveProject(project))
    } catch(err) {
        const res = await err.json()
        console.log(res)
    }
}

export const createProject = project => async(dispatch) => {
    const jwtToken = localStorage.getItem("jwtToken");
    let authToken;
    if (jwtToken) authToken = 'Bearer ' +  jwtToken;

    try{
        const res =  await fetch("/api/projects", {
            method: "POST",
            headers:{
                "Authorization": authToken,
                "CSRF-Token": getCookie("CSRF-TOKEN")
            },
            body: project
        });
        const data = await res.json();
        dispatch(receiveProject(data))
        return data
    } catch(err) {
        const res = await err.json();
        console.log(res)
    }
}

export const editProject = (projectId, project) => async(dispatch) => {
    try{
        const res =  await jwtFetch(`/api/projects/${projectId}/edit`, {
            method: "PATCH",
            body: JSON.stringify(project)
        });
        const data = await res.json();
        return dispatch(receiveUpdatedProject(data))
    } catch(err) {
        const res = await err.json();
        console.log(res)
    }
}

export const deleteProject = projectId => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/projects/${projectId}`,{
            method: "DELETE"
        })

        return dispatch(removeProject(projectId))
        
    } catch(err) {
        const res = await err.json()
        console.log(res)
    }
}

export const selectProject = projectId => state => state.projects[projectId]
export const selectProjects = state => state.projects

export const selectProjectsArray = createSelector(selectProjects, project => 
    Object.values(project)    
)

const projectReducer = (state = {}, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_PROJECTS:
            return action.projects
        case RECEIVE_PROJECT:
            newState[action.project._id] = action.project
            return newState
        case RECEIVE_UPDATED_PROJECT:
            newState[action.project._id] = {...newState[action.project._id], ...action.project}
            return newState
        case REMOVE_PROJECT:
            delete newState[action.projectId]
            return newState
        default:
            return state
    }
}

export default projectReducer