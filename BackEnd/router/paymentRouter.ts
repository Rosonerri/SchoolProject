import { Router } from "express";
import { createPayment, viewSchoolPayment } from "../controller/paymentController";
 


const router:Router = Router()


router.route("/create-payment/:schoolID").post(createPayment)
router.route("/view-payment/:schoolID").get(viewSchoolPayment)



export default router