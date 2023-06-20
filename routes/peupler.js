const assignmentRendu = require("../assignments1.json");
const assignmentNonRendu = require("../assignments2.json");
const User = require("../model/user");
const Matiere = require("../model/matiere");
const Assignment = require("../model/assignment");

async function peupler(req, res){
    const assignments = assignmentRendu.concat(assignmentNonRendu);

    const eleves = await User.find({ userType : "Normal"}).select("-encryptedPassword");
    const matieres = await Matiere.find({ });

    if(eleves && matieres){
        const newAssignments = assignments.map((a, key) => {
            return {
                ...a,
                eleve: eleves[key%eleves.length],
                matiere: matieres[key%matieres.length],
            }
        })
        Assignment.insertMany(newAssignments);
        res.json(newAssignments);
    }
}

module.exports = { peupler }