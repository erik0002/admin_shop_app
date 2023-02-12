exports.getLogin = (req, res, next) => {
            // const isLoggedIn = req
            //     .get('Cookie')
            //     .split(";")
            //     .trim()
            //     .split('=')[4];
            res.render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                isAuthenticated: false
            })
};


exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
};
