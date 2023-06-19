let Matiere = require("../model/matiere");

function getMatieres(req, res){
    Matiere.find({}, (err, matieres) =>{
        if(err){res.send(err)}
        res.json(matieres);
    })
}

async function postMatiere(req, res){
    const matiere = new Matiere();
    matiere.id = 3
    matiere.nom = "Oracle"
    matiere.prof = "Mopolo"
    matiere.couleur = "#0000ff"
    matiere.photo = "";
    const response = await matiere.save();
}

module.exports = {
    getMatieres ,
    postMatiere
}