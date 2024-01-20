import { Document, Schema, Types, model } from "mongoose"



interface iStaff{
    staffName: string
    staffRole: string
    schoolName: string
    phone: number
    school: {}
}


interface iStaffData extends iStaff, Document{}

const staffModel = new Schema<iStaffData>({
    staffName:{
        type: String
    },

    schoolName:{
        type: String
    },
    staffRole:{
        type:String
    },

    phone:{
        type: Number
    },
    school:[{
        type:Types.ObjectId,
        ref: "school"
    }]
},
{timestamps: true}
)

export default model<iStaffData>("staff", staffModel)