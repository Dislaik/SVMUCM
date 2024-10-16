const express = require('express');
const authRouter = require('./authRouter');
const roleRouter = require('./roleRouter')
const userRouter = require('./userRouter');
const headquarterRouter = require('./headquarterRouter');
const courseDurationRouter = require('./courseDurationRouter');
const courseModeController = require('./courseModeRouter');
const requestCourseRouter = require('./requestCourseRouter')
let router = express.Router();

router.stack = router.stack.concat(requestCourseRouter.stack);
router.stack = router.stack.concat(courseModeController.stack);
router.stack = router.stack.concat(courseDurationRouter.stack);
router.stack = router.stack.concat(headquarterRouter.stack);
router.stack = router.stack.concat(authRouter.stack);
router.stack = router.stack.concat(authRouter.stack);
router.stack = router.stack.concat(roleRouter.stack);
router.stack = router.stack.concat(userRouter.stack);

module.exports = router;