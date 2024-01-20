import {Schema, Types, model} from "mongoose"
import { iStudent } from "../utils/interfaces"



const studentModel = new Schema<iStudent>(

    {
        firstName:{
            type: String
        },

        lastName:{
            type: String
        },

        email:{
            type: String
        },

        enrollmentStatus:{
            type: String
        },
        role:{
            type: String,
            ref: "student"
        },
        department:{
            type: String,
        },
        grade:[{
            type: Types.ObjectId,
            ref: "grade"
        }],
        instructors:[{
            type: Types.ObjectId,
            ref: "instructors"
        }],
    },
    {timestamps: true}
)

export default model<iStudent>("student", studentModel)