import { getProject, getProjects } from "../utils/project_api_util"
import { createSelector } from 'reselect';

const RECEIVE_PROJECTS = "RECEIVE_PROJECTS"
const RECEIVE_PROJECT = "RECEIVE_PROJECT"

export const receiveProjects = projects => ({
    type: RECEIVE_PROJECTS,
    projects
})

export const receiveProject = project => ({
    type: RECEIVE_PROJECT,
    project
})

export const fetchProjects = () => async(dispatch) => {
    let data;
    try{
        const res = await getProjects();
        

    }

    if (res.ok) {
        data = await res.json()

    } else (
        data = await res.json()
    )
}

export const fetchProject = projectId => async(dispatch) => {
    const res = await getProject(projectId);
    let data;

    if (res.ok) {
        data = await res.json()
    } else (
        data = await res.json()
    )
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
            newState[action.project.id] = action.project
            return newState
        default:
            return state
    }
}

export default projectReducer