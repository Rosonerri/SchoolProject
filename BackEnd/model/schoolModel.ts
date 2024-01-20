import { Schema, model, Document, Types } from "mongoose"

interface iSchool{
    email: string
    verify: boolean
    enrollmentID: string
    status: string

    schoolName: string
    address: string
    plan: string

    started: boolean

    session: Array<{}>

    staff: Array<{}>
    payment: Array<{}>
}

interface iSchoolData extends iSchool, Document{}

const schoolModel = new Schema<iSchoolData>({
    
    email:{
        type: String,
        unique: true
    },

    verify:{
        type: Boolean,
        default: false
    },

    started:{
        type: Boolean,
        default: false
    },
    
    enrollmentID:{
        type: String
    },

    plan:{
        type: String,
        default: "In Active"
    },

    status:{
        type: String,
    },

    schoolName:{
        type: String
    },
    address:{
        type: String
    },

    session: [{
        type: Types.ObjectId,
        ref: "sessions"
    }],

    staff: [{
        type: Types.ObjectId,
        ref: "staffs"
    }],

    payment: [{
        type: Types.ObjectId,
        ref: "payments"
    }]

},
{timestamps: true}
)

export default model<iSchoolData>("school", schoolModel)