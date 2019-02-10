module.exports = (req, res, next)=> {
    if (!req.body.username || !req.body.title || !req.body.content){
        return res.redirect('/posts/new'); 
    }
    next()
}