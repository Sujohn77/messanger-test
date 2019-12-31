import * as axios from "axios";

export default class ProfileAPI  {
    constructor(){
        this.instance = axios.create({
            baseURL:"http://localhost:3001/"
        });
        this.returnData = response => response.data;
    }
    addFriend(friendEmail,id){
        return this.instance.post("profile/add",{friendEmail,id}).then(this.returnData);
    }
    getUsers(firstName,lastName){
        return this.instance.post("profile/users",{firstName,lastName}).then(this.returnData);
    }
    clearChat(chatId){
        return this.instance.delete("profile/chat/"+chatId).then(this.returnData);
    }
    createChat(name,token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post("http://localhost:3001/profile/chat/create/"+name).then(this.returnData);
    }
    addMembers(userEmails,chatId,token){
        axios.defaults.headers.post['authorization'] = token;
        return axios.post("http://localhost:3001/profile/chat/addMembers",{userEmails,chatId}).then(this.returnData);
    }
    getPortionMessages(chatId,startIndex,endIndex){
        return this.instance.post("profile/chat"+chatId+"/messages",{startIndex,endIndex}).then(this.returnData);
    }
    saveChatPosition(chatId,position){
        return this.instance.post("profile/chat/position",{chatId,position}).then(this.returnData);
    }
}
