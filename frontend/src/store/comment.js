import jwtFetch from "./jwt"
import { createSelector } from 'reselect';


const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
const RECEIVE_COMMENT = "RECEIVE_COMMENT"
const REMOVE_COMMENT = "REMOVE_COMMENT"


export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
})

export const fetchComments = projectId => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/comments/project/${projectId}`)

        const comments = await res.json()
        return dispatch(receiveComments(comments))
    } catch(err) {
        const res = await err.json()
        throw res
    }

}

export const fetchComment = commentId => async(dispatch) => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}`)
        const comment = res.json()
        return dispatch(receiveComment(comment))
    } catch(err) {
        const res = await err.json()
        throw res
    }
}

export const editComment = (commentId, comment) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}/edit`, {
            method: "PATCH",
            body: JSON.stringify(comment)
        })
        const data = await res.json()
        return dispatch(receiveComment(data))
    } catch(err) {
        const res = await err.json()
        throw res
    }
}



export const deleteComment = commentId => async(dispatch) => {
    const res = await jwtFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    
    if (res.ok) {
        dispatch(removeComment(commentId))
    }
}

export const addComment = comment => async dispatch => {
    try {
        const res = await jwtFetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify(comment)
        })

        const data = await res.json()
        return dispatch(receiveComment(data))
    } catch(err) {
        const res = await err.json()
        throw res
    }
}

export const selectComment = commentId => state => state.comments[commentId]
export const selectComments = state => state.comments

export const selectCommentsArray = createSelector(selectComments, comment => 
    Object.values(comment)
)

const commentReducer = (state = {}, action) => {
    const newState = Object.assign({}, state)
    const obj = {}

    switch (action.type) {
        case RECEIVE_COMMENTS:
            for (const comment of action.comments){
                obj[comment._id] = comment;
            }
            return obj
        case RECEIVE_COMMENT:
            newState[action.comment._id] = action.comment
            return newState
        case REMOVE_COMMENT:
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
}

export default commentReducer