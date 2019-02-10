const User = require('../database/models/User');

module.exports =  (req, res, next)=>{

    if(typeof req.session.userId != 'undefined'){
        User.findById(req.session.userId, (error, user)=>{
            if(error || !user){
                return  res.redirect('/');
            }
        });     
    }else{
        return  res.redirect('/');
    }
     
    next();
}