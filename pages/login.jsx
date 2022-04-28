import { useState } from 'react'
import HomeNav from '../components/HomeNav'
import styles from '../styles/form.module.css'
import Link from 'next/link'

const login = () => {

 const [formData, setFormData] = useState({
     email: "",
     password: ""
 })

  const submitHandle = e => {
      e.preventDefault()
      console.log("form submited");
  }

  return (
    <>
        < HomeNav />
        <div className={styles.formwrapper}>
        <form className={styles.loginForm} onSubmit={submitHandle}>
            <div className="my-4">
                <label className='block w-full mb-2' htmlFor="email">Enter your email</label>
                <input 
                  type="email"
                  id='email'
                  className='white-input p-2 block w-full border-none outline-none'
                  name='email'
                  value={formData.email}
                  onChange={ e => setFormData({...formData, email: e.target.value}) }
                />
            </div>
            <div className="my-8">
                <label className='block w-full mb-2' htmlFor="password">Enter your password</label>
                <input 
                  type="password"
                  id='password'
                  className='block w-full p-2 border-none outline-none'
                  name='password'
                  value={formData.password}
                  onChange={ e => setFormData({...formData, password: e.target.value}) }
                />
            </div>
            < Link href="/office" >
               <button className={`${styles.button} block border-none outline-none mx-auto btn p-2 px-4`} type="submit">LOGIN</button>               
            </Link>
        </form>
        </div>
    </>
  )
}

export default login