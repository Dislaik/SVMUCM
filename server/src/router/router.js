const express = require('express');
const authRouter = require('./authRouter');
const apuRouter = require('./apuRouter');
const roleRouter = require('./roleRouter')
const userRouter = require('./userRouter');
const userStatusRouter = require('./userStatusRouter');
const headquarterRouter = require('./headquarterRouter');
const facultyRouter = require('./facultyRouter');
const careerRouter = require('./careerRouter');
const regionRouter = require('./regionRouter');
const cityRouter = require('./cityRouter');
const projectStatusRouter = require('./projectStatusRouter');
const resourceRouter = require('./resourceRouter');
const project = require('./projectRouter');
const quotationStatusRouter = require('./quotationStatusRouter')
const apuResource = require('./apuResourceRouter');
const projectAPU = require('./projectApuRouter');
const quotationRouter = require('./quotationRouter');
const projectUserRouter = require('./projectUserRouter');
const VolunteerStudentRouter = require('./volunteerStudentRouter');
const ProjectVolunteerStudentRouter = require('./projectVolunteerStudentRouter');
const QuotationAPUResourceRouter = require('./quotationAPUResourceRouter');
let router = express.Router();

router.stack = router.stack.concat(authRouter.stack);
router.stack = router.stack.concat(apuRouter.stack);
router.stack = router.stack.concat(resourceRouter.stack);
router.stack = router.stack.concat(projectStatusRouter.stack);
router.stack = router.stack.concat(project.stack);
router.stack = router.stack.concat(quotationStatusRouter.stack);
router.stack = router.stack.concat(cityRouter.stack);
router.stack = router.stack.concat(regionRouter.stack);
router.stack = router.stack.concat(headquarterRouter.stack);
router.stack = router.stack.concat(facultyRouter.stack);
router.stack = router.stack.concat(careerRouter.stack);
router.stack = router.stack.concat(roleRouter.stack);
router.stack = router.stack.concat(userRouter.stack);
router.stack = router.stack.concat(userStatusRouter.stack);
router.stack = router.stack.concat(apuResource.stack);
router.stack = router.stack.concat(projectAPU.stack);
router.stack = router.stack.concat(quotationRouter.stack);
router.stack = router.stack.concat(projectUserRouter.stack);
router.stack = router.stack.concat(VolunteerStudentRouter.stack);
router.stack = router.stack.concat(ProjectVolunteerStudentRouter.stack);
router.stack = router.stack.concat(QuotationAPUResourceRouter.stack);

module.exports = router;