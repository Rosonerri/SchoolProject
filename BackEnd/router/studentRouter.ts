import { Router } from "express";
import { createStudent } from "../controller/studentController";



const router: Router = Router()

router.route("/create-student").post(createStudent)

export default router