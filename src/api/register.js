import * as axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:3001/"
});

export const UserAPI = {
    setUserData(data){
        return instance.post(`register/me`,data).then(response => response.data);
    },
    getAuth(token){
        axios.defaults.headers.post['authorization'] = token;
        return instance.post(`login`).then(response => response.data);
    },
    sendCodeAndCheckEmail(data){
        return instance.post("register",data).then(response => response.data)
    }
};