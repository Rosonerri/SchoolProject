import { Router } from "express";
import { createSchoolSession, studentPerSession, termPerSection, viewSchoolSession } from "../controller/sessionController";



const router: Router = Router()


router.route("/create-session").post(createSchoolSession)
router.route("/view-session").get(viewSchoolSession)
router.route("/student-per-session/:sessionID").get(studentPerSession)
router.route("/term-per-session/:sessionID").get(termPerSection)



export default router;