import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL).then((res) => {
            console.log("DB Connected", res.connection.host)
        }).catch((err) => {
            console.log("DB Disconnected!", err)
            process.exit();
        })
    } catch (error) {
        console.log(error)
    }
}