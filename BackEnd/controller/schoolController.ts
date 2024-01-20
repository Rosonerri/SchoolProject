import { Request, Response } from "express";
import schoolModel from "../model/schoolModel";
import crypto from "crypto"
import jwt from "jsonwebtoken"
import {verifiedEmail} from "../utils/email"

export const createSchool = async (req:Request, res:Response): Promise<Response> =>{
try {

    const {email} = req.body
    
    const id = crypto.randomBytes(4).toString("hex")
  const school = await schoolModel.create({
    email,
    enrollmentID: id,
    status: "School-Admin"
  })

    verifiedEmail(school);


    return res.status(201).json({
        message: "User Created Successfully",
        data: school 
    })
} catch (error) {
    return res.status(404).json({
        message: "Error Creating User"
    })
}
}

export const verifySchool = async (req:Request, res:Response): Promise<Response> => {
try {
  const {schoolID} = req.params
  const school = await schoolModel.findById(schoolID)

  if(school){
    const verified = await schoolModel.findByIdAndUpdate(schoolID, {verify: true}, {new: true})


    return res.status(200).json({
      message: "School Verified Successfully",
      data: verified
    })
  }else{
    return res.status(404).json({
      message: "Error Verifying School"
    })
  }
  
} catch (error) {
  console.log(error)
  return res.status(404).json({
    message: "Error Verifying School"
  })
}
}

export const viewSchoolStatus = async (req:Request, res:Response): Promise<Response> => {
try {
  const  {schoolID} = req.params
  const school = await schoolModel.findById(schoolID)

  
  return res.status(200).json({
    message: "Reading Schools",
    data: school
  })
} catch (error) {
  return res.status(404).json({
    message: "Error Reading"
  })
}
}

export const viewAllSchools = async (req:Request, res:Response): Promise<Response> => { 
try {
  const school = await schoolModel.find()

  return res.status(200).json({
    message: "Viewing all school",
    data: school,
    length: school.length
  })
} catch (error) {
  return res.status(404).json({
    message: "Error Viewing All schools"
  })
}
}

export const loginInSchool = async (req:any, res:Response): Promise<Response> =>{
try {
  const {email, enrollmentID} = req.body

  const school = await schoolModel.findOne({email});

  if(school){
      if(school.enrollmentID === enrollmentID){
        if(school.verify){

         const token  = jwt.sign(
          { status: school.status},
          "school",
         {expiresIn: "1d"}
         );

         req.session.Auth = true;
         req.session.schoolID = school._id;

         return res.status(201).json({
          message: "Welcome Back",
          data: token,
          status: 201
         });
         

         

        }else{
          return res.status(404).json({
            message: "Please Check your email to verify your Account"
          })
        }
      }else{
        return res.status(404).json({
          message: "Error reading your school enrollment ID"
        })
      }
  }else{
  return res.status(404).json({
    message: "Error Login User"
  })
  }
} catch (error) {
  return res.status(404).json({
    message: "Error Login User"
  })
}
}

export const logOutSchool = async (req: any, res:Response): Promise<Response> =>{
  try {
    req.session.destroy();
    return res.status(200).json({
      message: "Goodbye"
    })
  } catch (error) {
    return res.status(404).json({
      message: "Error"
    })
  }
}

export const readSchoolCookie = async (req:any, res:Response): Promise<Response> => {
  try {
    const school = req.session.isSchoolID
    return res.status(201).json({
      message: "Reading Cookie",
      data: school
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error"
    })
  }
}

export const deleteSchool = async (req: Request, res:Response): Promise<Response> => {
try {
  const {schoolID} = req.params

  await schoolModel.findByIdAndDelete(schoolID)

  return res.status(200).json({
    message: "School Deleted Successfully",
  })

} catch (error) {
  return res.status(404).json({
    message: "Error Deleting School"
  })
}
}

export const changeSchoolName = async (req: Request, res:Response): Promise<Response> => { 
try {
  const {schoolID} = req.params
  const {schoolName} = req.body

  const school = await schoolModel.findById(schoolID)

  if(school){
    const nameChange = await schoolModel.findByIdAndUpdate(schoolID, {schoolName}, {new: true});
    return res.status(201).json({
      message: "School Name Updated Successfully",
      data: nameChange
    })
  }else{
    return res.status(404).json({
      message: "Error Updating School Name",
    })
  }

} catch (error) {
  return res.status(404).json({
    message: "Error"
  })
}
}

export const changeSchoolAddress = async (req:Request, res:Response): Promise<Response> => {
  try {
    const { schoolID } = req.params
    const { address } = req.body

    const school = await schoolModel.findById(schoolID)

    if(school){
        const changeAdress = await schoolModel.findByIdAndUpdate(schoolID, {address}, {new: true});

        return res.status(200).json({
          message: "Address updated Successfully",
          data: changeAdress
        })
    }else{
      return res.status(200).json({
        message: "Error Updating",
      })
    }
  } catch (error) {
    return res.status(200).json({
      message: "Error",
    })
  }
}