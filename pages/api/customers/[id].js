import mongoose from 'mongoose'
import CONNECTDB from '../../../middleware/connectDB'
import CUSTOMER from '../../../models/customers'

export default async function handler(req, res) {

    const { method } = req
    const { id } = req.query

    await CONNECTDB()

    switch (method) {

        case "GET":
            try {
                const retrivedCustomer = await CUSTOMER.findById(id)
                if (!retrivedCustomer) {
                    res.status(400).json({ msg: "customer not found" })
                }

                res.status(200).json(retrivedCustomer)
                console.log("customer found!");
            } catch (error) {
                console.log(error);
                res.status(404).json(error)
            }
            break;


        case "DELETE":
            try {
                const removedCustomer = await CUSTOMER.findByIdAndDelete(id)
                res.status(200).json({ message: "removed successfully", removedCustomer })

            } catch (error) {
                console.log(error);
                res.status(404).json(error)
            }
            break;


        case "PATCH":
            try {
                const { body } = req

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ msg: "customer not found" })
                }

                await CUSTOMER.findById(id)
                    .then(customer => {
                        customer.debtorName = body.debtorName,
                            customer.debtorTell = body.debtorTell,
                            customer.loan = body.loan,
                            customer.homeAdress = body.homeAdress,
                            customer.bonds = body.bonds,
                            customer.debtorPhoto = body.debtorPhoto,
                            customer.sponsorName = body.sponsorName,
                            customer.sponsorTell = body.sponsorTell,
                            customer.sponsorPhoto = body.sponsorPhoto

                        customer.save(error => console.log(error))

                        res.status(200).json(customer)
                    })


            } catch (error) {
                console.log("something went wrong");
                res.status(400).json(error)
            }
            break;



        default:
            break;
    }

}

