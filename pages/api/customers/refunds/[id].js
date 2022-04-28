import mongoose from 'mongoose'
import CONNECTDB from '../../../../middleware/connectDB'
import CUSTOMER from '../../../../models/customers'

export default async function handler (req, res) {

    const { method } = req
    const { id } = req.query

    await CONNECTDB()

    switch (method) {

        case "PATCH":
            try {
                const {body} = req
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ msg: `customer with ${id} not found` })
                }

                await CUSTOMER.findById(id)
                .then( customer => {
                   customer.refund.push(body)
                   customer.save()
                   res.status(200).json(customer)
                })
               
            } catch (error) {
                res.status(400).json(error)
                console.log("something went wrong");
            }
            break;


        default:
            break;
    }

}

