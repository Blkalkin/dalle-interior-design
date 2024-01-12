import jwtFetch from "./jwt"

const RECEIVE_NEW_IMAGE = "RECEIVE_NEW_IMAGE"
const REMOVE_NEW_IMAGE = "REMOVE_NEW_IMAGE"

export const receiveNewImage = image => ({
    type: RECEIVE_NEW_IMAGE,
    image
})

export const removeImage = () => ({
    type: REMOVE_NEW_IMAGE,
    emptyState: {}
})

export const standardImageEdit = (image) =>  async(dispatch) => {
    const res = await jwtFetch("/api/images/generate-image", {
        method: "POST",
        body: JSON.stringify(image)
    })

    if (res.ok) {
        let data = await res.json()
        dispatch(receiveNewImage(data))
        return res
    } else {
        // return res
    }

}


export const creativeImageEdit = (image) =>  async(dispatch) => {
   
    const res = await jwtFetch("/api/images/generate-prompt-image", {
        method: "POST",
        body: JSON.stringify(image)
    })

    if (res.ok) {
        let data = await res.json()
        dispatch(receiveNewImage(data))
        return res
    } else {
        let data = await res.json()
        throw data
    }

}
// export const creativeImageEdit = image => async(dispatch) => {
//     const res = await jwtFetch("/api/images/generate-prompt-image",{
//         method: "POST",
//         body: JSON.stringify(image)
//     })

//     if (res.ok) {
//         let data = await res.json()
//         dispatch(receiveNewImage(data))
//         return res
//     }
// }


const newImageReducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_NEW_IMAGE:
            return action.image
        case REMOVE_NEW_IMAGE:
            return null
        default:
            return state
    }
}

export default newImageReducer
