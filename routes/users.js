let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let secret = "*[gbHf{4}{wuZ+:6@jh4#THnS]kU89";
let User = require("../model/user");

async function authenticate(req,res){
    let user = req.body;
    let password = crypto.createHash('md5').update(user.password?user.password:"").digest('hex');
    let registered = await User.findOne({email: user.email?.toLowerCase(), encryptedPassword: password}).select("-encryptedPassword");
    if(registered){
        let token = jwt.sign({sub: registered._id}, secret,{
            expiresIn: '5h'
        });
        res.json({
            userInfo:registered, 
            token: token
        });
    }
    else{
        res.status(401).json({
            message: "Mot de passe ou email incorrect."
        })
    }
}

module.exports = {authenticate}