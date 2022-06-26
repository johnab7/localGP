import axios from "axios";
import { useContext } from "react";
//import {LocalServerURL} from "../Utilities/UtilServer";

export const Session_Username = 'authenticatedUser'
export const Session_Role= 'authenticatedRole'
export const Session_Token= 'token'

// export function JwtAuthenticationService(username, password) {
//     console.log('201'+username, password);
//     let awt= axios.post(`${LocalServerURL}/login`, {
//         username,
//         password
//     })
//     console.log('202')
//     console.log(awt);
//     return awt;
//     // return axios.post(`${LocalServerURL}/login`, {
//     //     username,
//     //     password
//     // })
// }

export function registerationSuccessful(username, userRole, token) {
    sessionStorage.setItem(Session_Username, username);
    sessionStorage.setItem(Session_Role, userRole)
    sessionStorage.setItem(Session_Token, token)

    
    // setupAxiosInterceptors((token));
}

// export function createJWTToken(token) {
//     console.log('Bearer ' + token);
//     return 'Bearer ' + token
// }


export function logout() {
    sessionStorage.removeItem(Session_Username);
    sessionStorage.removeItem(Session_Role);
    sessionStorage.removeItem(Session_Token);   
}

export function isUserLoggedIn() {
    //let user = useContext(AuthContext.username);
    let user = sessionStorage.getItem(Session_Username)
    if (user === null) return false
    return true
}

export function getLoggedInUserName() {
    let user = sessionStorage.getItem(Session_Username)
    if (user === null) return ''
    return user
}
export function getLoggedInUserRole(){
    let userRole= sessionStorage.getItem(Session_Role);
    if(userRole===null) return ''
    return userRole
}
//  function setupAxiosInterceptors(token) {

//     console.log("configuration started")
//     axios.interceptors.request.use(
//         (config) => {
//             if (isUserLoggedIn()) {
//                 config.headers.authorization = token
//             }
//             return config
//         }
//     )
// }