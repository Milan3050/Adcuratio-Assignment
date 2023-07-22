import axios from 'axios';


const AxiosInstance = () =>{ 
    let baseURL = 'https://api.stackexchange.com'

    return axios.create({
            baseURL: baseURL
        });
}

export { AxiosInstance }