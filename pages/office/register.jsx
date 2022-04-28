import { useState } from 'react'
import OfficeNav from "../../components/OfficeNav"
import styles from '../../styles/form.module.css'
import FileBase64 from 'react-file-base64';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

const register = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    debtorName: "",
    debtorTell: "",
    loan: "",
    homeAdress: "",
    bonds: [],
    debtorPhoto: "",
    sponsorName: "",
    sponsorTell: "",
    sponsorPhoto: "",

  })

  const submitHandle = async e => {
    e.preventDefault()
    const { debtorName, debtorTell, loan, homeAdress, bonds, debtorPhoto, sponsorName, sponsorTell, sponsorPhoto } = formData

    if (debtorName && debtorTell && loan && homeAdress && bonds && debtorPhoto && sponsorName && sponsorTell && sponsorPhoto) {
      const url = "/api/customers"  
        await axios.post( url, formData )
        .then(res => {
          const { data } = res
          console.log(data)
        })
        .catch(error => console.log(error))


      setFormData({
        debtorName: "",
        debtorTell: "",
        loan: "",
        homeAdress: "",
        bonds: [],
        debtorPhoto: "",
        sponsorName: "",
        sponsorTell: "",
        sponsorPhoto: "",
      })

      // router.reload(window.location.pathname)
      router.push("/office/customers")

    } else {
      // alert a message
       alert("please, fill all fields")
    }

  }
  return (
    <>
      < OfficeNav />
      <div className={`${styles.registerFormWrapper} my-8`}>
        <h2 className='mb-4 capitalize'>register a customer</h2>
        <form className={styles.registerForm} autoComplete="false" onSubmit={submitHandle}>
          <div className="my-4">
            <label className='block w-full mb-2' htmlFor="debtorName">Enter debtor name</label>
            <input
              type="text"
              id='debtorName'
              className='white-input p-2 block w-full border-none outline-none'
              name='debtorName'
              value={formData.debtorName}
              onChange={e => setFormData({ ...formData, debtorName: e.target.value })}
            />
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="debtorTell">Enter debtor phone number</label>
            <input
              type="text"
              id='debtorTell'
              className='block w-full p-2 border-none outline-none'
              name='debtorTell'
              value={formData.debtorTell}
              onChange={e => setFormData({ ...formData, debtorTell: e.target.value })}
            />
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="loan">Enter amount of loan</label>
            <input
              type="text"
              id='loan'
              className='block w-full p-2 border-none outline-none'
              name='loan'
              value={formData.loan}
              onChange={e => setFormData({ ...formData, loan: e.target.value })}
            />
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="homeAdress">Enter home adress of debtor</label>
            <input
              type="text"
              id='homeAdress'
              className='block w-full p-2 border-none outline-none'
              name='homeAdress'
              value={formData.homeAdress}
              onChange={e => setFormData({ ...formData, homeAdress: e.target.value })}
            />
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="bonds">Enter bonds</label>
            <input
              type="text"
              id='bonds'
              className='block w-full p-2 border-none outline-none'
              name='bonds'
              value={formData.bonds}
              onChange={e => setFormData({ ...formData, bonds: e.target.value.split(",") })}
            />
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="sponsorName">Enter sponsor name</label>
            <input
              type="text"
              id='sponsorName'
              className='block w-full p-2 border-none outline-none'
              name='sponsorName'
              value={formData.sponsorName}
              onChange={e => setFormData({ ...formData, sponsorName: e.target.value })}
            />
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="sponsorTell">Enter sponsor tell</label>
            <input
              type="text"
              id='sponsorTell'
              className='block w-full p-2 border-none outline-none'
              name='sponsorTell'
              value={formData.sponsorTell}
              onChange={e => setFormData({ ...formData, sponsorTell: e.target.value })}
            />
          </div>

          <div className="my-8">
            <label className='block my -2'>debtor photo</label>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, debtorPhoto: base64 })
              }
            />
          </div>

          <div className="my-8">
            <label className='block my-2'>sponsor photo</label>
            < FileBase64
              type="file"
              multiple={false}
              onDone={
                ({ base64 }) => setFormData({ ...formData, sponsorPhoto: base64 })
              }
            />
          </div>
          <button className={`${styles.button} block border-none outline-none mx-auto btn p-2 px-4`} type="submit">REGISTER</button>
        </form>
      </div>
    </>
  )
}

export default register


