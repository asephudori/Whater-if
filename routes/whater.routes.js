const Router = require('express');
const { getWhater } = require('../controllers/whater.controllers');

const whaterRouter = Router();

whaterRouter.get('/search', getWhater);

module.exports = whaterRouter;
