const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const interviewRouter = express.Router()
const upload = require("../middleware/file.middleware")

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)


/** * @route GET /api/interview/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/:interviewId",authMiddleware.authUser,interviewController.generateInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of a user
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)


/** * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume pdf based on user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)


module.exports = interviewRouter
