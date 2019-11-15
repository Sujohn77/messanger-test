let response = require("./response");

module.exports = function(req,res,next)  {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    }

    response = {
        resultCode: 1,
        data: {},
        message: "Token wasn't passed"
    };

    res.json(response);
};