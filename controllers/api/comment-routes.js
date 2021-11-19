const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// CREATE a new comment
router.post('/', withAuth, async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    try {
        const commentData = await Comment.create({
            comment_contents: req.body.comment_contents,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;