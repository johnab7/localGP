// import axios from './axios';
// import UseAuth from './UseAuth';

// const RefreshAxios = () => {
//     const { setAuth } = UseAuth();

//     const refresh = async () => {
//         const responseToken = sessionStorage.getItem(token);
//         // await axios.get('/refresh', {
//         //     withCredentials: true
//         // });
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             // console.log(response.data.accessToken);
//             // return { ...prev, accessToken: response.data.accessToken }
//             console.log(responseToken);
//             return {...prev, accessToken:responseToken}
            
//         });
//         //return response.data.accessToken;
//         return responseToken;
//     }
//     return refresh;
// };

// export default RefreshAxios;