let Matiere = require("../model/matiere");

function getMatieres(req, res){
    Matiere.find({}, (err, matieres) =>{
        if(err){res.send(err)}
        res.json(matieres);
    })
}

module.exports = {
    getMatieres ,
}