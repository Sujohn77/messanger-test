import * as axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:3001/",
    withCredentials: true
});

export const UserAPI = {
    setUserData(data){
        debugger
        return instance.post(`register`,data).then(response => response.data.map(el => new User(el)));
    },
    getAuth(token){
        axios.defaults.headers.post['authorization'] = token;
        return instance.post(`login`).then(response => response.data);
    },
    verifyCode(code){
        return instance.post(`login`,code);
    }
};

class User {

    constructor(data) {
        Object.assign(this, data);
    }

    get lastPost() {
        return this.posts.sort()[0].name;
    }

}