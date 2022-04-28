import { useState } from 'react'
import HomeNav from '../components/HomeNav'
import styles from '../styles/form.module.css'
import Link from 'next/link'

const Login = () => {

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
      <div className={styles.loginformWrapper}>
        <form className={styles.loginForm} autoComplete="false" onSubmit={submitHandle}>
          <h2 className='my-4' >LOGIN TO OFFICE</h2>
          <div className="my-4">
            <label className='block w-full mb-2' htmlFor="email">Enter your email</label>
            <div className="flex justify-center items-center">
              <svg className='w-10 h-10 p-2 bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>
              <input
                type="email"
                id='email'
                className={`${styles.input} p-2 block w-full border-none outline-none`}
                name='email'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="my-8">
            <label className='block w-full mb-2' htmlFor="password">Enter your password</label>
            <div className="flex justity-center items-center">
              <svg className='w-10 h-10 p-2 bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z" /></svg>
              <input
                type="password"
                id='password'
                className={`${styles.input} block input w-full p-2 border-none outline-none`}
                name='password'
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          < Link href="/office" >
            <button className={`${styles.button} block border-none outline-none mx-auto btn p-2 px-4`} type="submit">LOGIN</button>
          </Link>
        </form>
      </div>
    </>
  )
}

export default Login