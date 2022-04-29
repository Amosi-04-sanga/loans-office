import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OfficeNav from '../../components/OfficeNav'
import { BoxLoading } from 'react-loadingg'
import styles from '../../styles/customerInfo.module.css'
import moment from 'moment'
//import swal from 'swal'


const CustomerInfo = () => {
  const router = useRouter()
  const [customer, setCustomer] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [amount, setAmount] = useState("")
  const Router = useRouter()
  const { customerInfo } = Router.query
  console.log(customerInfo);

  useEffect(() => {

    const getCustomer = async () => {
      await axios.get(`/api/customers/${customerInfo}`)
        .then(res => {
          const { data } = res
          console.log(data)
          setCustomer(data)
        }).catch(error => console.log(error))
    }

    getCustomer()

  }, [customerInfo])

  const popOutForm = () => {
    setIsActive(true)
  }

  const format3dig = (num) => {
    return Number(num).toLocaleString()
  }


  const handleSubmit = e => {
    e.preventDefault()

    const obj = {
      date: new Date(),
      amount
    }

    if (amount) {
      axios.patch(`/api/customers/refunds/${customerInfo}`, obj)
        .then(res => {
          const { data } = res
          console.log(data)
          console.log("refund successed!");
        })
        .catch(error => console.log(error))

      setAmount("")
      setIsActive(false)

      router.reload(window.location.pathname)

    } else {
      alert({
        title: "error!",
        text: "please fill amount!"
      })
    }
  }


  const debtCalc = () => {

    const arr = customer.refund

    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += Number(arr[i].amount)
    }

    const debt = customer.loan - sum

    return debt
  }



  return (
    <div>
      < OfficeNav />

      <div className={styles.mainSection}>
        <div className={isActive ? `${styles.formOpen}` : `${styles.formClosed}`}>
          <form method='post' autoComplete='off' className={`${styles} p-2 bg-orange-300`} onSubmit={handleSubmit}>
            <div className="row">
              <label className='block pt-4' >Enter amount:</label>
              <input
                type="text"
                name="amount"
                value={amount}
                className="p-1 mt-2 mb-8 w-full"
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <input className='block hover:bg-blue-300 transition duration-300 cursor-pointer btn p-2 px-4 bg-blue-200 mx-auto' type="submit" />
          </form>
        </div>

        <div className={`${styles.topFlex} pt-8 mb-10 flex justify-between items-center`}>
          <p className={`${styles.bottomline} inline-block`} >Customer details</p>
          <button onClick={popOutForm} className={`${styles.refundBtn} mt-4 cursor-pointer block p-2 border-none outline-none`} >REFUND</button>
        </div>

        <section className={isActive ? `${styles.details}` : ""}>
          <div className="p-8 lg:p-20">

            {
              customer ? (
                <div >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 place-items-center">
                    <div className="col-span-5">
                      <p className='pb-2' > Debtor: {customer.debtorName} </p>
                      <div className={`${styles.photo}`}>
                        <img className='w-full h-full' src={customer.debtorPhoto} alt={customer.debtorName} />
                      </div>
                    </div>

                    <div className="col-span-7">
                      <p className={styles.info} > <span>Debtor Name:  </span> {customer.debtorName} </p>
                      <p className={styles.info} > <span>Debtor contact:  </span> {customer.debtorTell} </p>
                      <p className={styles.info} > <span>Loan:  </span> { format3dig(customer.loan) } </p>
                      <p className={styles.info} > <span>Date:  </span> {moment(customer.createdAt).format("DD MMM, YYYY")} </p>
                      <p className={styles.info} >
                        <span>Amount left: </span>

                        {
                          debtCalc() <= "0" ?
                            (
                              Router.push("/office/customers"),
                              axios.delete( `/api/customers/${customerInfo}` )
                            ) :
                            format3dig(debtCalc())
                        }

                      </p>
                      <p className={styles.info} > <span>Home adress:  </span> {customer.homeAdress} </p>
                      <p className={styles.info} > <span>Bonds: </span> {customer.bonds.join()} </p>
                    </div>
                  </div>

                  <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-4 place-items-center">
                    <div className="col-span-5">
                      <p className='pb-2' > Debtor: {customer.sponsorName} </p>
                      <div className={`${styles.photo}`}>
                        <img className='w-full h-full' src={customer.sponsorPhoto} alt={customer.sponsorName} />
                      </div>
                    </div>

                    <div className="col-span-7 ">
                      <p className={styles.info} > <span>sponsor Name:  </span> {customer.sponsorName} </p>
                      <p className={styles.info} > <span>sponsor contact:  </span> {customer.sponsorTell} </p>
                    </div>
                  </div>
                </div>
              ) :
                (<h1 >
                  <BoxLoading />
                </h1>)
            }
          </div>

          <div className="p-2 py-6 lg:p-8 mt-8">
            <ol className='list-decimal md:text-left grid place-items-center' >
              {
                customer && (
                  customer.refund.map((obj, index) => (
                    <li key={index} className={`${styles.refundItem} mb-2`} > {format3dig(obj.amount)}/= on {moment(obj.date).format("DD MMM, YYYY")} </li>
                  ))
                )
              }
            </ol>
          </div>

        </section>
      </div>

    </div>
  )
}

export default CustomerInfo

// 

