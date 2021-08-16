const express = require('express');
const router = express.Router();
const links = require('../controllers/links.controller');
/** TODO: Links CRUD routes */

router.get('/links',links.list);
router.get('/links/:id',links.detail);

module.exports = router;
