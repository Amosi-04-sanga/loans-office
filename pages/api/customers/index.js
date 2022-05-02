import CONNECTDB from "../../../middleware/connectDB"
import CUSTOMER from '../../../models/customers'


export default async function handler (req, res) {

  const {method} = req

  CONNECTDB()

  switch (method) {
    
    case "GET":
        try {
          const customers = await CUSTOMER.find({})
          res.status(200).json(customers)
          
        } catch (error) {
          res.status(400).json(error)
          console.log("something went wrong")
        }
      break;


    case "POST":
         try {
           const newCustomer = new CUSTOMER(req.body)
           await newCustomer.save()
           .then( doc => {
             console.log(doc)
            })
            res.status(201).json(newCustomer)


         } catch (error) {
            res.status(400).json(error)
            console.log("something went wrong")
         }
      break;

  
    default:
      break;

  }
}


export const config = {
  api: {
      bodyParser: {
          sizeLimit: '30mb',
          extended: true 
      }
  }
}

