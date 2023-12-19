import jwtFetch from './jwt';
// import { RECEIVE_CURRENT_USER } from './session';

export const RECEIVE_USER = "users/RECEIVE_CURRENT_USER";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})


export const getUser = userId => returnUser(userId)

const returnUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`)
    const user = await res.json();
    return dispatch(receiveUser(user))
}

// const initialState = {
//     userSearch: null
// };

const userReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case RECEIVE_USER:
            newState[action.user._id] = action.user
            return newState;
        default:
            return state;
    }
};

export default userReducer;
