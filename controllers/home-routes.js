const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ //!!! why isn't this working
            include: [{
                model: Comment,
                attributes: [
                    "id",
                    "comment_contents",
                    "user_id",
                    "post_id"
                ], include: [{ model: User, attributes: ["id", "username"], }],
            }, {
                model: User, attributes: ["id", "username"],
            }],
        });
        const posts = postData.map((post) =>
            post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            usernameMain: req.session.user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// GET one post for homepage
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_contents",
                        "user_id",
                        "post_id"
                    ],
                    include: [{
                        model: User,
                    }]
                }, { model: User }
            ],
        });
        const post = postData.get({ plain: true });
        res.render('postSingle', {
            loggedIn: req.session.loggedIn,
            usernameMain: req.session.user,
            post
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// get all posts by logged in user for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Post, include: {
                    model: Comment, include: [{
                        model: User,
                    }]
                }
            }]
        });
        const posts = userData.get({ plain: true });
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            usernameMain: req.session.user,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
// login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
// sign up page
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});
// renders post page 
router.get('/post', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('post');
});

module.exports = router;