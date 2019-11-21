let response = require("../response");

module.exports = function (req,res,next) {
  if(req.body === undefined && req.params === undefined){
      response = {
          resultCode: 1,
          data: {},
          message: "Request body was empty"
      };
      res.json(response);
  }
  else{
      next();
  }
};