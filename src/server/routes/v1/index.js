const express = require('express');

const standardRoutes = require('./salesforce.route');

const router = express.Router();
router.get('/status', (req, res) => res.json({ status: 'ok' }));

router.use('/salesforce', standardRoutes);
module.exports = router;
