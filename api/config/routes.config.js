const express = require('express');
const router = express.Router();
const links = require('../controllers/links.controller');
/** TODO: Links CRUD routes */

router.get('/links',links.list);
router.get('/links/:id',links.detail);
router.post('/links', links.create);
router.put('/links/:id',links.edit);
router.delete('/links/:id',links.delete);


module.exports = router;
