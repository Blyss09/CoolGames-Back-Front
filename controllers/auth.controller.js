const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    console.log("Données reçues:", req.body);
    const {pseudo, email, password} = req.body;

    try {
        // Vérification préalable de l'email
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                errors: { email: 'Cet email est déjà enregistré' } 
            });
        }

        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        console.log("Erreur complète:", err);
        const errors = signUpErrors(err);
        res.status(400).json({ errors });  // Utilisez .json() au lieu de .send()
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = signInErrors(err);
        res.status(401).json({ errors });
    }
};

module.exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: "Logged out" });
};