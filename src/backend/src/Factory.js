const Factory = {};

Factory.chatCreator = (_id,type,members,messages,name) => ({
    _id,type,members,messages,name
});

module.exports = Factory;