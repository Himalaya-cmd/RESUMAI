const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GoogleGenAI_API
});


const interviewReportSchema = z.object({
    matchScore: z.number(),

    overallReview: z.string().describe(
        "Overall evaluation of the candidate for this role"
    ),

    strengths: z.array(
        z.string()
    ).describe("Candidate strengths relevant to the job"),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["Low", "Medium", "High"]),
            recommendation: z.string()
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            title: z.string(),
            focusArea: z.string(),
            tasks: z.array(z.string())
        })
    )
});

async function generateInterviewReport({resume,selfDescription,jobDescription}){
        const prompt = `
            Analyze the candidate profile and generate a complete interview report.

            Requirements:
            - matchScore must be between 0 and 100.
            - Provide a detailed overallReview.
            - Mention candidate strengths.
            - Generate at least 5 technicalQuestions.
            - Generate at least 5 behavioralQuestions.
            - Generate at least 3 skillGaps.
            - Generate a 7-day preparationPlan.
            - Return data strictly according to the provided JSON schema.

            Resume:
            ${resume}

            Self Description:
            ${selfDescription}

            Job Description:
            ${jobDescription}
            `;
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema)
            }
    })

    console.log(JSON.parse(response.text))
}

module.exports = generateInterviewReport