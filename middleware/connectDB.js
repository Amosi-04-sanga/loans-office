import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URI

const CONNECTDB = async () => {
    await mongoose.connect( mongoUrl )
    .then( res => {
        console.log("successfully connected to database")
    })
    .catch( error => {
        console.log(error)
        console.log("failed to connect to database");
    })
}


export default CONNECTDB


