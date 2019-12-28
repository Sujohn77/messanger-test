const Factory = {};

Factory.chatCreator = (_id,type,members,messages,name,position) => ({
    _id,type,members,messages,name,position
});

module.exports = Factory;