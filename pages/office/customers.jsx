import Link from "next/link"
import OfficeNav from "../../components/OfficeNav"
import CONNECTDB from "../../middleware/connectDB"
import CUSTOMER from '../../models/customers'
import styles from '../../styles/customers.module.css'

const customers = ({ customers }) => {
  console.log(customers);
  return (
    <>
      < OfficeNav />
      <div className="p-4 md:p-8">
      <div className="flex justify-between mt-10 mb-8">
        <p>Customer details</p>
        <p> {customers.length} customers </p>
      </div>
      {
        customers ? (
          <div className="my-4">
            <ol className={`${styles.customerList} mx-auto`} >
              {
                customers.map((customer, index) => (
                  <li key={index} className= {`grid grid-cols-12 py-2`} >
                    <div className={`${styles.customerLink} cursor-pointer col-span-10 sm:col-span-11 p-2`}>
                      <Link href={`/office/${customer._id}`} >
                        <p>{customer.debtorName}</p>
                      </Link>
                    </div>
                    <div className="flex justify-end items-center col-span-2 sm:col-span-1">
                      <svg className={`${styles.icon} w-8 h-8`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" /></svg>
                    </div>
                  </li>
                ))
              }
            </ol>
          </div>
        ) : "loading..."
      }
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



