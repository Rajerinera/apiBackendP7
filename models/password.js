const passValidator = require('password-validator');

const passSchema = new passValidator();

passSchema
    .is().min(4) //minimum de la longueur du mdp
    .is().max(100) //maximum de la longueur du mdp
    .has().uppercase(1) // majuscule obligatoire dans le mdp
    .has().lowercase(1) // minuscule obligatoire dans le mdp
    .has().digits(1) // nombre de chiffre obligatoire dans le mdp
    .has().not().spaces() // pas d'espaces dans le mdp
    .is().not().oneOf(['Motdepasse1', 'motdepasse2']); 

console.log(passSchema.validate('les règles à rappeler', {list: true})); 


module.exports = passSchema;