import React from 'react'
import styles from "./footer.module.css";
import Image from 'next/image';
import linkedin from "public/linkedin.svg"
import Link from 'next/link';
import mail from "public/mail.svg"

export default function Footer() {
  return (
    <div className={styles.footer}>
        <p className={styles.footertext}>Developed by TomRam ©2023 – All Rights Reserved</p>
        <Link target='blank' href={"https://www.linkedin.com/in/thomas-ramillon-0b584611b"}>
        <Image width={30} height={30} src={linkedin} alt='linkedin' />
        </Link>
        <Link href={"mailto:thomas.ramillon@gmail.com"}>
        <Image width={30} height={30} src={mail} alt='mail' />
        </Link>
    </div>
  )
}
