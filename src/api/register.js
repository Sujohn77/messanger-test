import * as axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:3001/"
});

export const UserAPI = {
    setUserData(data){
        return instance.post(`register`,data).then(response => response.data);
    }
};
