const router = require('express').Router();

const userRoutes = require('./user-routes');

const blogRoutes = require('./blog-routes')

const commentRoutes = require('./comment-routes');

const dashboardRoutes = require('./dashboard-routes')

router.use('/users', userRoutes);

router.use('/post', blogRoutes);

router.use('/comments', commentRoutes)

router.use('/dashboard', dashboardRoutes)

module.exports = router;