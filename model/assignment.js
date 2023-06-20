let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    eleve: {
        type: Object,
        required: true,
    },
    note: Number,
    remarques: String,
    matiere: {
        type: Object,
        required: true
    }
});
AssignmentSchema.plugin(mongoosePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
