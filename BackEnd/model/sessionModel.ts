import { Schema, model, Document, Types } from "mongoose"

interface iSession {
    year: string;
    term: string;
    totalStudent: number;
    totalExpense: number;
    totalAmountReceived: number
    profit: number
    

    school: {}
}

interface iSessionData extends iSession, Document{}

const sessionModel = new Schema<iSessionData>({
    
    year:{
        type: String,
     },

    term:{
        type: String,
    },

    totalStudent:{
        type: Number,
        default: 0

    },

    totalExpense:{
        type: Number,
        default: 0

    },

    totalAmountReceived:{
        type: Number,
        default: 0

    },

    
    profit:{
        type: Number,
        default: 0
    },

    school:[{
        type: Types.ObjectId,
        ref: "schools"
    }]

},
{timestamps: true}
)

export default model<iSessionData>("session", sessionModel)