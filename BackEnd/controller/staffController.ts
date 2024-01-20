import { Request, Response } from "express"
import schoolModel from "../model/schoolModel"
import staffModel from "../model/staffModel"
import { Types } from "mongoose"
import { staffDuty } from "../utils/enums"




export const createSchoolPrincipal = async (req:Request, res:Response) =>{
    try {
        const  {schoolID } = req.params
        const { staffName } = req.body

        const school = await schoolModel.findById(schoolID)

        if(school && school.schoolName && school.status === "School-Admin"){
            const staff = await staffModel.create({
         staffName,
         schoolName: school.schoolName,
         staffRole: staffDuty.PRINCIPAL
         });
         school.staff.push(new Types.ObjectId(staff._id))
         school.save();

         return res.status(201).json({
            message: "Principal Created Succesfully",
            data: staff
         })
        }else{
            return res.status(404).json({
                message: "Unable to Create Principal ",
             })
        }

    } catch (error) {
        return res.status(404).json({
            message: "Error ",
         })
    }
}

export const createSchoolVP = async (req: Request, res:Response): Promise<Response> =>{
try {
    const {schoolID} = req.params
    const { staffName } = req.body
 
    const school = await schoolModel.findById(schoolID);

    if (school && school.schoolName && school.status === "School-Admin"){
        const staff = await staffModel.create({
            staffName,
            schoolName: school.schoolName,
            staffRole: staffDuty.VP
        })

        school.staff.push(new Types.ObjectId(staff._id))
         school.save();

        return res.status(201).json({
            message: "Teacher Created Successfully",
            data: staff
        })
    }else{
        return res.status(404).json({
            message: "Error Creating Vice-Principal",
        })
    }
} catch (error) {
    return res.status(404).json({
        message: "Error",
    })
}
}

export const createSchoolTeacherByAdmin = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const {schoolID} = req.params
        const {staffName} = req.body
    
        const school = await schoolModel.findById(schoolID);
    
        if (school && school.schoolName && school.status === "School-Admin"){
            const staff = await staffModel.create({
                staffName,
                schoolName: school.schoolName,
                staffRole: staffDuty.TEACHER
            })

            school.staff.push(new Types.ObjectId(staff._id))
            school.save();


            return res.status(201).json({
                message: "Teacher Created Successfully",
                data: staff
            })
        }else{
            return res.status(404).json({
                message: "Error Creating Teacher",
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error",
        })
    }
 }


 export const createSchoolTeacherByPricipal = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const {staffID} = req.params
        const {staffName} = req.body
    
        const staff = await staffModel.findById(staffID);

        const school = await schoolModel.findOne({ schoolName: staff?.schoolName})
    
        if (staff && staff.schoolName && staff.staffRole === "principal"){
            const newStaff = await staffModel.create({
                staffName,
                staffRole: staffDuty.TEACHER
            })

            school!.staff.push(new Types.ObjectId(newStaff._id))
            school!.save();

            return res.status(201).json({
                message: "Teacher Created Successfully",
                data: newStaff
            })
        }else{
            return res.status(404).json({
                message: "Error Creating Teacher",
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error",
        })
    }
 }



 export const createSchoolTeacherByVicePricipal = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const {staffID} = req.params
        const {staffName} = req.body
    
        const staff = await staffModel.findById(staffID);

        const school = await schoolModel.findOne({ schoolName: staff?.schoolName})
    
        if (staff && staff.schoolName && staff.staffRole === "vice-principal"){
            const newStaff = await staffModel.create({
                staffName,
                staffRole: staffDuty.TEACHER
            })

            school!.staff.push(new Types.ObjectId(newStaff._id))
            school!.save();

            return res.status(201).json({
                message: "Teacher Created Successfully",
                data: newStaff
            })
        }else{
            return res.status(404).json({
                message: "Error Creating Teacher",
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error",
        })
    }
 }

