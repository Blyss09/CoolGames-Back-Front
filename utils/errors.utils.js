module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' };

    // Gestion des erreurs de validation
    if (err.message) {
        if (err.message.includes('pseudo'))
            errors.pseudo = "Pseudo incorrect ou déjà pris";
        
        if (err.message.includes('email'))
            errors.email = 'Email incorrect';
        
        if (err.message.includes('password'))
            errors.password = 'Le mot de passe doit faire 6 caractères minimum';
    }

    // Gestion des erreurs de doublon (code 11000)
    if (err.code === 11000 && err.keyValue) {
        const field = Object.keys(err.keyValue)[0];
        
        if (field.includes('pseudo'))
            errors.pseudo = 'Ce pseudo est déjà pris';
        
        if (field.includes('email'))
            errors.email = 'Cet email est déjà enregistré';
    }

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }; 

    if (err.message.toLowerCase().includes("email incorrecte"))
        errors.email = "Email inconnu";
    if (err.message.toLowerCase().includes("mot de passe incorrect"))
        errors.password = "Le mot de passe ne correspond pas";

    return errors;
};

module.exports.uploadErrors = (err) => {
    let errors = { format: "", maxSize: "", noFile: "" };

    if (err.message.includes("Format invalide"))
        errors.format = "Format de fichier non pris en charge. Formats autorisés : jpg, jpeg, png.";

    if (err.message.includes("Taille max"))
        errors.maxSize = "Le fichier dépasse la taille maximale de 500 Ko.";

    if (err.message.includes("Aucun fichier reçu"))
        errors.noFile = "Aucun fichier n'a été envoyé.";

    return errors;
};