const express = require('express');
const authRouter = require('./authRouter');
const roleRouter = require('./roleRouter')
const userRouter = require('./userRouter');
let router = express.Router();

router.stack = router.stack.concat(authRouter.stack);
router.stack = router.stack.concat(roleRouter.stack);
router.stack = router.stack.concat(userRouter.stack);

module.exports = router;