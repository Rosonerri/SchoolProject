import { Router } from "express";
import { changeSchoolAddress, changeSchoolName, createSchool, deleteSchool, logOutSchool, loginInSchool, readSchoolCookie, verifySchool, viewAllSchools, viewSchoolStatus } from "../controller/schoolController";



const router: Router = Router()

router.route("/create-school").post(createSchool)
router.route("/login-school/").post(loginInSchool)
router.route("/verify-school/:schoolID").post(verifySchool)
router.route("/view-school/:schoolID").get(viewSchoolStatus)
router.route("/view-all-school/:schoolID").get(viewAllSchools)
router.route("/logout-school/:schoolID").delete(logOutSchool)
router.route("/readschool-cookie/:schoolID").get(readSchoolCookie)
router.route("/delete-school/:schoolID").get(deleteSchool)
router.route("/change-school-name/:schoolID").patch(changeSchoolName)
router.route("/change-school-address/:schoolID").patch(changeSchoolAddress)


export default router