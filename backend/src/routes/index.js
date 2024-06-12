const express = require('express');
const questionRoutes = require('./questionRoutes');

const router = express.Router();
router.use('/assignment', questionRoutes);

module.exports = router;
