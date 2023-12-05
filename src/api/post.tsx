import { getToken } from "../assets/helpers"
import { serverAdress } from "../constants/constants"

const post = (route: string, body: Object) => {
    return fetch(serverAdress + route, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}}`,
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

export default post;