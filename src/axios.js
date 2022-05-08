import axios from'axios';

//setting Up baseURL to Fetch Data from the API 

const axiosInstance = axios.create({
    baseURL:`https://api.covid19api.com`
});

export default axiosInstance;