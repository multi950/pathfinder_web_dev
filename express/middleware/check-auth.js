const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    console.log(getCookie("authorization", req.headers.cookie));

    try{
        
        //const token = req.headers.authorization.split(" ")[1];
        const token = getCookie("authorization", req.headers.cookie);
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("decoded: "+ decoded);
        req.userData = decoded;
        next();
    } catch (err){
        return res.status(401).json({
            message: "auth failed"
        });
    }
};

function getCookie(cname, cookies) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }