const express = require('express');
const authRouter = require('./authRouter');
const roleRouter = require('./roleRouter')
const userRouter = require('./userRouter');
const headquarterRouter = require('./headquarterRouter');
const facultyRouter = require('./facultyRouter');
const careerRouter = require('./careerRouter');
const regionRouter = require('./regionRouter');
const cityRouter = require('./cityRouter');
const projectStatusRouter = require('./projectStatusRouter');
const projectResourceRouter = require('./projectResourceRouter');
const project = require('./projectRouter');
let router = express.Router();

router.stack = router.stack.concat(authRouter.stack);
router.stack = router.stack.concat(projectResourceRouter.stack);
router.stack = router.stack.concat(projectStatusRouter.stack);
router.stack = router.stack.concat(project.stack);
router.stack = router.stack.concat(cityRouter.stack);
router.stack = router.stack.concat(regionRouter.stack);
router.stack = router.stack.concat(headquarterRouter.stack);
router.stack = router.stack.concat(facultyRouter.stack);
router.stack = router.stack.concat(careerRouter.stack);
router.stack = router.stack.concat(roleRouter.stack);
router.stack = router.stack.concat(userRouter.stack);

module.exports = router;