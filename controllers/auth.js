const User = require("../models/user")

exports.getLogin = (req, res, next) => {
            res.render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                isAuthenticated: false
            })
};


exports.postLogin = (req, res, next) => {
    User.findById('63d694ea4c25e7f7a2063b92')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect("/");
        })
        .catch(err => console.log(err));
};
