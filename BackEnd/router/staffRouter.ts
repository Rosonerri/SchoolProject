import { Router } from "express";
import { createSchoolPrincipal, createSchoolVP } from "../controller/staffController";


const router: Router = Router()

router.route("/create-principal/schoolID").post(createSchoolPrincipal)
router.route("/create-VP/:schoolID").post(createSchoolVP)

export default router;