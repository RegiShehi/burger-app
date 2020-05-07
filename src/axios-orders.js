import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6a508.firebaseio.com/'
});

export default instance;