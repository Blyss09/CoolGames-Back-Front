const UserModel = require('../models/user.model');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = async (req, res) => {
    try {
        // Vérification de la présence du fichier
        if (!req.file) {
            throw Error("Aucun fichier reçu");
        }
        
        // Vérification du type MIME
        if (
            req.file.mimetype !== "image/jpg" && 
            req.file.mimetype !== "image/png" && 
            req.file.mimetype !== "image/jpeg"
        ) {
            throw Error("Format invalide");
        }

        if (req.file.size > 500000) {
            throw Error("Taille max");
        }
        
        const fileName = req.body.name + ".jpg";
        const filePath = `${__dirname}/../client/public/uploads/profil/${fileName}`;
        
        // Assurez-vous que le dossier existe
        const dir = `${__dirname}/../client/public/uploads/profil`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Écrivez le buffer du fichier dans le système de fichiers
        fs.writeFileSync(filePath, req.file.buffer);
        
        // Mise à jour de l'utilisateur dans la base de données
        const user = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        
        return res.status(200).json(user);
        
    } catch (err) {
        console.error(err);
        const errors = uploadErrors(err);
        return res.status(400).json({ errors });
    }
};