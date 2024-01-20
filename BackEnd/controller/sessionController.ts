import { Request, Response } from "express";
import sessionModel from "../model/sessionModel";
import schoolModel from "../model/schoolModel";
import { Types } from "mongoose";



export const createSchoolSession = async (req:Request, res:Response): Promise<Response> =>{
    try {
       
        const {schoolID} = req.params
        const {year, term} = req.body


        const school = await schoolModel.findById(schoolID)

        if(school && school.schoolName){

        const session = await sessionModel.create({
            year,
            term
        })

        school.session.push(new Types.ObjectId(session._id))
        school.save()

        return res.status(201).json({
            message: "Session Created Successfully",
            data: session
        })
        }else{
            return res.status(404).json({
                message: "Unable to create Session"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}

export const viewSchoolSession = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const {schoolID} = req.params

        const school = await schoolModel.findById(schoolID).populate({
            path: "sessions"
        })
        return res.status(200).json({
            message: "Reading School session",
            data: school?.session
        })

    } catch (error) {
        return res.status(400).json({
            message: "Error"
        })
    }
}

export const studentPerSession = async (req:Request, res: Response): Promise<Response>  => {
    try {
        const {sessionID} = req.params
        const {totalStudent} = req.body

        const session = await sessionModel.findById(sessionID)

        if(session){
            const student = await sessionModel.findByIdAndUpdate(sessionID, {totalStudent}, {new: true});

            return res.status(200).json({
                message: "Total student gotten",
                data: student
            })
        }else{
            return res.status(404).json({
                message: "Error finding total student"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}

export const termPerSection = async (req:Request, res:Response): Promise<Response> =>{
    try {
        const { sessionID } = req.params
        const { term } = req.body

        const perTerm  = await sessionModel.findById(sessionID)

        if(perTerm){
            const updateTerm = await sessionModel.findByIdAndUpdate(sessionID, {term}, {new: true});
            
            return res.status(201).json({
                message: "Session PerTerm updated",
                data: updateTerm
            })
        }else{
            return res.status(404).json({
                message: "Error while updating term"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}

export const viewSchoolPayment = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const {schoolID} = req.params

        const school = await schoolModel.findById(schoolID).populate({
            path: "payment"
        })
        return res.status(200).json({
            message: "Viewing School Payment",
            data: school?.payment
        })

    } catch (error) {
        return res.status(400).json({
            message: "Error"
        })
    }
}