const { PDFParse } = require("pdf-parse")
const {generateInterviewReport} = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const {generateResumePdf} = require("../services/ai.service")

/**
 * @description Controller to generate interview report on the basis of user self description,resume pdf and job description 
 */
async function generateInterViewReportController(req,res){
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF is required"
            })
        }

        const {selfDescription,jobDescription} = req.body

        if (!jobDescription) {
            return res.status(400).json({
                message: "Job description is required"
            })
        }

        const parser = new PDFParse({ data: req.file.buffer })
        let resumeContent

        try {
            resumeContent = await parser.getText()
        } finally {
            await parser.destroy()
        }

        const interViewReportByAi = await generateInterviewReport({
            resume:resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user : req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message:"Interview Report Generated Successfully",
            interviewReport
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Failed to generate interview report",
            error: err.message
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function generateInterviewReportByIdController(req,res){
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id : interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
    
}

/**
 * @description Controller to get reports of all logged-in user.
 */

async function getAllInterviewReportsController(req,res){
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}

/**
 * @description Controller to generate resume pdf based on user self description, resume content and job description.
 */

async function generateResumePdfController(req,res){
    try{
        console.log("Controller hit");

        const {interviewReportId}=req.params;
        console.log(interviewReportId);

        const interviewReport =
            await interviewReportModel.findById(interviewReportId);

        console.log(interviewReport);

        const resumePdfData = await generateResumePdf({
            resume: interviewReport.resume,
            selfDescription: interviewReport.selfDescription,
            jobDescription: interviewReport.jobDescription
        });

        res.setHeader("Content-Type","application/pdf");
        res.send(resumePdfData);

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
}



module.exports = {generateInterViewReportController,generateInterviewReportByIdController,getAllInterviewReportsController,generateResumePdfController}
