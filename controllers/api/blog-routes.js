const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// CREATE a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;