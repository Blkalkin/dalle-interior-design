import jwtFetch from './jwt';
// import { RECEIVE_CURRENT_USER } from './session';

export const RECEIVE_USER = "users/RECEIVE_CURRENT_USER";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})




export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`)
    let data;

    if (res.ok) {
        data = await res.json()
        dispatch(receiveUser(data))
    } else {
        data = await res.json()
        throw data
    }
}



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
