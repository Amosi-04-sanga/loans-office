import axios from "axios"
import Link from "next/link"
import OfficeNav from "../../components/OfficeNav"
import styles from '../../styles/customers.module.css'
import { useEffect, useState } from 'react'
import { BoxLoading } from 'react-loadingg'

const Customers = () => {
  const [customers, setCustomers] = useState(null)
  useEffect(() => {
    const getClients = async () => {
      try {
        await axios.get("/api/customers")
          .then(doc => {
            const { data } = doc
            console.log(data)
            setCustomers(data)
          })
      } catch (error) {
        console.log(error)
      }
    }
    getClients()

  }, [])



  return (
    <>
      < OfficeNav />
      <div className="p-4 md:p-8">
        <div className="flex justify-between mt-10 mb-8">
          <p>Customer details</p>
          {
            !customers ?
              "" :
              customers.length === 1 ?
                (
                  <p> {customers.length} customer</p>
                ) :
                (
                  <p> {customers.length} customers</p>
                )
          }
        </div>

        {
          !customers ?
            (
              <span style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} > < BoxLoading /> </span>
            ) :
            customers.length === 0 ?
              (
                <span style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} > NO CUSTOMERS </span>
              ) :
              (
                <div className="my-4">
                  <ol className={`${styles.customerList} mx-auto`} >
                    {
                      customers.map((customer, index) => (
                        <li key={index} className={`grid grid-cols-12 py-2`} >
                          <div className={`${styles.customerLink} cursor-pointer col-span-10 sm:col-span-11 p-2`}>
                            <Link href={`/office/${customer._id}`} >
                              <p>{customer.debtorName}</p>
                            </Link>
                          </div>
                          <div className="flex justify-end items-center col-span-2 sm:col-span-1">
                            
                               {
                                  <span className={styles.refundNo} > {customer.refund.length} </span>
                               }

                          </div>
                        </li>
                      ))
                    }
                  </ol>
                </div>
              )
        }

      </div>


    </>
  )
}

export default Customers

/*
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

*/

