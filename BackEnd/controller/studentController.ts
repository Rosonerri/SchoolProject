import { Request, Response } from "express";
import crypto from "crypto"
import studentModel from "../model/studentModel";



export const createStudent = async (req: Request, res:Response) => {
try {
    const {firstName, lastName, email } = req.body
    const token  = crypto.randomBytes(3).toString("hex")

    const student = await studentModel.create({
        firstName,
        lastName, 
        email,
        token,
    })
    return res.status(200).json({
        message: "Student Created successfully",
        data: student
    })
} catch (error) {
    return res.status(404).json({
        message: "Error Creating Student"
    })
}
}