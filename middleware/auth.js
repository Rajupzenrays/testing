const jwt = require("jsonwebtoken");

module.exports = function(req,res, next){
	const token = req.header("token");
	//if token is not found , then throw error
	if (!token) return res.status(401).json({message:"Auth Token Error"});
	try {
		const decodedToken = jwt.verify(token, "secretString");
		req.id = decodedToken.id;
		req.email = decodedToken.email;

		//next means go ahead
		next();
	} catch(e) {
		console.error(e);
		res.status(500).send({message: "Token Not Valid"});
		
	}
}