import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const URL: string = "mongodb://127.0.0.1:27017/Sch"
export const dbConfig = async () =>{
    try {
        return await connect(URL).then(() =>{
            console.log("DataBase Connected Successfully🌎🌍🌍")
        })
        .catch(err => console.error())
        
    } catch (error) {
        return error
    }
}