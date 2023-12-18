import jwtFetch from '../jwt';

export const getUser = (userId) => returnUser(userId, `api/users/${userId}`)

const returnUser = (userId, route) = async dispatch => {
    const res = await jwtFetch(route)
    const user = await res.json();
    return user
}
