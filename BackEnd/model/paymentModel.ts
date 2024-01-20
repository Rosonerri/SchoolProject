import { Document, Schema, Types, model } from "mongoose"



interface iPayment{
    datePaid: string
    expiryDate: string
    schoolName: string
    paymentID: number
    cost: number
    school: {}
}


interface iStaffData extends iPayment, Document{}

const staffModel = new Schema<iStaffData>({
    datePaid:{
        type: String
    },

    schoolName:{
        type: String
    },
    expiryDate:{
        type:String
    },

    paymentID:{
        type: Number
    },

    cost:{
        type: Number
    },
    school:[{
        type:Types.ObjectId,
        ref: "school"
    }]
},
{timestamps: true}
)

export default model<iStaffData>("payment", staffModel)