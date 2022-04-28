import OfficeNav from "../../components/OfficeNav"
import CONNECTDB from "../../middleware/connectDB"
import CUSTOMER from '../../models/customers'
import styles from '../../styles/customers.module.css'


const customers = ( {customers} ) => {
  console.log(customers);
  return (
    <>
       < OfficeNav />
        <div className="flex justify-between">
          <p>Customer details</p>
          <button className={`${styles.button} block border-none outline-none mx-auto btn p-2 px-4`} type="btn">REFUND</button>
        </div>
    </>
  )
}

export default customers


export async function getServerSideProps(context) {

  await CONNECTDB()

  const result = await CUSTOMER.find({})
  const customers = result.map((doc) => {
    const post = doc.toObject()
    post._id = post._id.toString()
    post.createdAt = post.createdAt.toString()
    return post
  })

  return {
    props: { customers }, // will be passed to the page component as props
  }

}



