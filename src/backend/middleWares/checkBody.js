let response = require("../response");

module.exports = function (req,res,next) {
  if(req.body.email === undefined){
      console.log(req.body);
      response = {
          resultCode: 1,
          data: {},
          message: "Request body was empty"
      };
      console.log(response);
      res.json(response);
  }
  else{

      next();
  }
};