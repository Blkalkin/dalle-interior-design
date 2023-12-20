import jwtFetch from "../store/jwt"

export const editImage = (image) =>  async(dispatch) => {
    const res = await jwtFetch("/api/images/generate-image", {
        method: "POST",
        body: JSON.stringify(image)
    })
    data = await res.json()
    return data
}