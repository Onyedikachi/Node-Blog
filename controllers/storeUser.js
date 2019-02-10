const User = require('../database/models/User');

module.exports = (req, res) =>{
    User.create(req.body, (error, user)=>{

        if (error){
            const registrationErrors = Object.keys(error.errors).map(key =>error.errors[key].message)
            // req.session.registrationErrors = registrationErrors;
            req.flash('registrationErrors', registrationErrors);
            req.flash('data',req.body);
            console.log(req.body);
            return res.redirect('/auth/register');
        }
        res.redirect('/');
    });
}