import * as axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:3001/"
});

const returnData = response => response.data;

export const UserAPI = {
    setUserData(data){
        return instance.post(`register/me`,data).then(returnData);
    },
    verifyCode(code){
        return instance.post("register/verify",code).then(returnData);
    },
    sendCodeAndCheckEmail(data){
        return instance.post("register",data).then(returnData);
    },
    getAuth(token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post(`http://localhost:3001/login/auth`).then(returnData);
    },
    login(data){
        return instance.post("login",data).then(returnData);
    },

};

export const ProfileAPI ={
    addFriend(data,token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post("http://localhost:3001/profile/add",data).then(returnData);
    },
    getUsers(name){
        return instance.get("profile/users/"+name).then(returnData);
    }
};