import Link from "next/link"
import styles from '../styles/homeNav.module.css'

const HomeNav = () => {
  return (
    <nav className={`${styles.nav} sticky top-0`} >
       <div className={`${styles.logo} text-xl uppercase flex items-center justify-center`}>
           <Link href="/" >logo</Link>
       </div>
       <div className={`${styles.links} flex justify-around items-center`}>
           
           <Link href="/guideance" >
              <span>Guideance</span>
           </Link>
           <Link href="/contacts" >
              <span>Contacts</span>
           </Link>
           <Link href="/login" >
              <span>Office</span>
           </Link>
       </div>
    </nav>
  )
}

export default HomeNav