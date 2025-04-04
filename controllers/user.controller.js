const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require('bcrypt');


// Récupérer les infos de tout les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};


// Récupérer les infos d'un utilisateur
module.exports.userInfo = async (req, res) => {
  console.log(req.params);

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }

  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.send(user);
  } catch (err) {
    console.error("Erreur lors de la récupération de l’utilisateur :", err);
    res.status(500).send("Erreur serveur");
  }
};


// Modification des informations de l'utilisateur
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu : " + req.params.id);
  
    try {
      // Vérifie si l'utilisateur existe
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }
  
      // Vérifie si un nouveau mot de passe est fourni
      let updatedFields = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        picture: req.body.picture,
      };
  
      if (req.body.password) {
        const salt = await bcrypt.genSalt();
        updatedFields.password = await bcrypt.hash(req.body.password, salt);
      }
  
      // Met à jour l'utilisateur
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).select("-password");
  
      res.send(updatedUser);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      res.status(500).json({ message: err.message });
    }
  };


  module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
