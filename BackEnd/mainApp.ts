import { Application, Request, Response } from "express";
import student from "./router/studentRouter"
import school from "./router/schoolRouter"
import session from "./router/sessionRouter"
import staff from "./router/staffRouter"
import payment from "./router/paymentRouter"
export const mainApp = (app: Application) =>{
    try {

        app.use("/api/", student)
        app.use("/api/", school)
        app.use("/api/", session)
        app.use("/api/", staff)
        app.use("/api/", payment)
        app.get("/", (req:Request, res:Response) => { 
           try {

            let count = false

            const timer = setTimeout(() =>{
                count = true;

                // console.log(count )

                clearTimeout(timer)
            }, 2000)

            return res.status(200).json({
                message: "Default Api"
            })
           } catch (error) {
            return res.status(404).json({
                message: "Error While Loading Api"
            })
           }
        })
    } catch (error) {
        return error
    }
}