const router = require('express').router();

const userRoutes = require('./userr_routes');

router.use('/users',userRoutes);

module.exports = router;