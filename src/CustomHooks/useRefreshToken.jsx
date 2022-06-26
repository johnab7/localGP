import axios from '../FrontendAPIs/axios';
import useAuth from './useAuth';

const Session_Token= 'token'
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = () => {
        const response = sessionStorage.getItem(Session_Token)
        console.log(response);
        // await axios.get('/refresh', {
        //     withCredentials: true
        // });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response);
            return { ...prev, accessToken: response }
        });
        return response;
    }
    return refresh;
};

export default useRefreshToken;