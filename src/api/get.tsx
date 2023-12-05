import { getToken } from "../assets/helpers"
import { serverAdress } from "../constants/constants"

const get = (route: string) => {
    return fetch(serverAdress + route, {
        headers: {
            'Authorization': `Bearer ${getToken()}}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    })
}

export default get;