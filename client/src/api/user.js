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
    addFriend(friendEmail,id){
        
        return instance.post("profile/add",{friendEmail,id}).then(returnData);
    },
    getUsers(firstName,lastName){
        return instance.post("profile/users",{firstName,lastName}).then(returnData);
    },
    clearChat(chatId){
        return instance.delete("profile/chat/"+chatId).then(returnData);
    },
    createChat(name,token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post("http://localhost:3001/profile/chat/create/"+name).then(returnData);
    },
    addMembers(userEmails,chatId,token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post("http://localhost:3001/profile/chat/addMembers",{userEmails,chatId}).then(returnData);
    },
    getPortionMessages(chatId,startIndex,endIndex){
        return instance.post("profile/chat"+chatId+"/messages",{startIndex,endIndex}).then(response => response.data);
    },
    saveChatPosition(chatId,position){
        return instance.post("profile/chat/position",{chatId,position}).then(response => response.data);
    }
};