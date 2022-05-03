import Link from "next/link"
import styles from '../styles/homeNav.module.css'

const OfficeNav = () => {
   return (
      <nav className={`${styles.nav} sticky top-0`} >
         <div className={`${styles.logo} text-xl uppercase flex items-center justify-center`}>
            logo
         </div>
         <div className={`${styles.links} flex justify-around items-center`}>

            <Link href="/office/customers" >
               <span>Customers</span>
            </Link>
            <Link href="/office/register" >
               <span>Register</span>
            </Link>
            <Link href="/" >
               <span>logout</span>
            </Link>
         </div>
      </nav>
   )
}

export default OfficeNav