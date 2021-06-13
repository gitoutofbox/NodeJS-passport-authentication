const User = require("../models/User");
const bryptjs = require("bcryptjs");
const passport = require("passport");

const getusers = (req, res) => {
    User.find()
    .then(users => res.send(users))
    .catch(err => res.send(err))
};
const addUser = (req, res) => {
    console.log(req.body)
    const newUser = new User({...req.body});
    bryptjs.genSalt(10, (err, salt) => {
        bryptjs.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
            .then(user => {return res.redirect("/login")})
            .catch(err => res.send(err));
        })
    })
    
};
const login = (req, res) => {
    res.render("login")
}

const checkLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);

    // const userObj = req.body;
    // User.findOne({email: userObj.email}).then(user => {
    //     bryptjs.compare(userObj.password, user.password, (err, isMatch) => {
    //         if(isMatch) {
    //             return res.redirect("/dashboard");
    //         } else {
    //             return res.redirect("/login");
    //         }
    //     })
    // })
    // .catch(err => {
    //     return res.redirect("/login");
    // })

}
const register = (req, res) => {
    res.render("register")
}
module.exports = {
    getusers,
    addUser,
    login,
    register,
    checkLogin
}