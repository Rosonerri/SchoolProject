import {Request, Response} from "express"
import paymentModel from "../model/paymentModel"
import schoolModel from "../model/schoolModel"
import { Types } from "mongoose"
import moment from "moment"
import crypto from "crypto"



export const createPayment = async (req:Request, res:Response) => { 
    try {
        const {schoolID} = req.params
        // const { datePaid, expiryDate, paymentID } = req.body

        const school = await schoolModel.findById(schoolID)

        const timer = setTimeout( async () => {
            await schoolModel.findByIdAndUpdate(schoolID, {plan: "in active"}, {new: true});
            clearTimeout(timer)
        }, 1000 * 60)

        if(school && school.schoolName){

            const startDate = new Date();
            const datePeriod = startDate.setMinutes(startDate.getMinutes() + 1)

            // console.log("started : ", moment(startDate).format("LLL"))
            // console.log("ended : ", moment(datePeriod).format("LLL"))
            // console.log(datePeriod)

            const paymentID = crypto.randomBytes(3).toString("hex")

            const payment = await paymentModel.create({
                cost: 200000,
                schoolName:school?.schoolName,
                datePaid: moment(startDate).format("LLL"),
                expiryDate: moment(datePeriod).format("LLL"), 
                paymentID 
            })

            await schoolModel.findByIdAndUpdate(schoolID, {plan: "active"}, {new: true})

            school.session.push(new Types.ObjectId(payment._id))
            school.save()

            return res.status(201).json({
                message: "Viewing School Payment",
                data: payment
            })
        }else{
            return res.status(404).json({
                message: "Error Creating Session",
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            message: "Error" 
        })
    }
}

export const viewSchoolPayment = async (req:Request, res:Response) => {
try {
    const {schoolID} = req.params

    const school = await schoolModel.findById(schoolID).populate({
        path: "payments"
    });
    return res.status(202).json({
        message: "Payment Viewed Successfully",
        data: school
    })
} catch (error) {
    return res.status(404).json({
        message: "Error Viewing Payment"
    })
}
}

