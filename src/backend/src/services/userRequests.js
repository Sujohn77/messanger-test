const User = require("../models/user");
const userServices = {};

userServices.findUserByFilter = (filterValue,filterName) => {
    switch(filterName){
        case "email": 
            return User.findOne({email:filterValue},(err,user) => {
                if(err){
                    console.log(err);
                }
                else {
                    return user;
                }
            });
      
        case "id": 
            return User.findById(filterValue,(err,user) =>{
                if(err){
                    console.log(err);
                }
                else {
                    return user;
                }
            });
    }
}

userServices.updateChatsUser = (id,chatId) => {
    
    return User.findOneAndUpdate(id, {$push: {"chatsId": chatId}}, {useFindAndModify: false});
}


module.exports = userServices;