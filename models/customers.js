import mongoose, {Schema} from 'mongoose'

const customersSchema = new Schema({
    debtorName: {
        type: String,
        required: [true, "name of customer must be provided"],
        maxlength: 20,
    },
    debtorTell: {
        type: String,
        required: [true, "phone number of customer must be provided"],
    },
    loan: {
        type: String,
        required: [true, "loan must be provided"],
    },
    homeAdress: {
        type: String,
        required: [true, "home adresss must be provided"],
    },
    bonds: {
        type: [String],
        required: [true, "bonds must be provided"],
    },
    debtorPhoto: {
        type: String,
    },
    sponsorName: {
        type: String,
        required: [true, "name of sponsor is required"],
        maxlength: 20
    },
    sponsorTell: {
        type: String,
        required: [true, "phone number of sponsor must be provided"]
    },
    sponsorPhoto: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    refund: {
        type: [Object]
    }
}) 

export default mongoose.models.customers || mongoose.model('customers', customersSchema);



 
