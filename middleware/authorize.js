const jwt = require('jsonwebtoken');
let User = require("../model/user");
let secret = "*[gbHf{4}{wuZ+:6@jh4#THnS]kU89";

module.exports = {authorize, getUserByToken, checkIfAdmin};

const Role = {
    Admin : "Admin",
    Normal : "Normal",
}

function authorize() {
    return [
        jwt({ secret, algorithms: ['HS256'] })
    ];
}

async function getUserByToken(req, res, next){
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    try{
        jwt.verify(token, secret, async (err, user)=>{
            
            if(err) return res.sendStatus(403);
            req.user = await User.findOne({ _id: user.sub }).select("-encryptedPassword");
            next();
        })
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

async function checkIfAdmin(req, res, next){
    if(!req.user.userType == Role.Admin){
        r
        return res.status(403).json({message: "Utilisateur non autorisé"})
    }else{
        next();
    }
}