import * as axios from "axios";

export default class UserAPI  {
    constructor(){
        this.instance = axios.create({
            baseURL:"http://localhost:3001/"
        });
        this.returnData = response => response.data;
    }
    setUserData(data){
        return this.instance.post(`register/me`,data).then(this.returnData);
    }
    verifyCode(code){
        return this.instance.post("register/verify",code).then(this.returnData);
    }
    sendCodeAndCheckEmail(data){
        return this.instance.post("register",data).then(this.returnData);
    }
    getAuth(token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post(`http://localhost:3001/login/auth`).then(this.returnData);
    }
    login(data){
        return this.instance.post("login",data).then(this.returnData);
    }
}