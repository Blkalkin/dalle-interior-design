import jwtFetch from "./jwt"

const RECEIVE_NEW_IMAGE = "RECEIVE_NEW_IMAGE"
const REMOVE_NEW_IMAGE = "REMOVE_NEW_IMAGE"

export const receiveNewImage = image => ({
    type: RECEIVE_NEW_IMAGE,
    image
})

export const removeImage = () => ({
    type: REMOVE_NEW_IMAGE
})

export const editImage = (image) =>  async(dispatch) => {
    console.log("making new image...")
    const res = await jwtFetch("/api/images/generate-image", {
        method: "POST",
        body: JSON.stringify(image)
    })

    if (res.ok) {
        console.log("Render Compete!")
        let data = await res.json()
        dispatch(receiveNewImage(data))
    }

}

const newImageReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_NEW_IMAGE:
            return action.image
        case REMOVE_NEW_IMAGE:
            return state
        default:
            return state
    }
}

export default newImageReducer
