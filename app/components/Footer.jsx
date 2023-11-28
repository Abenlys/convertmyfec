import React from 'react'
import styles from "./footer.module.css";
import Image from 'next/image';
import linkedin from "public/linkedin.svg"
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={styles.footer}>
        <p className={styles.footertext}>Developed by TomRam ©2023 – All Rights Reserved</p>
        <Link target='blank' href={"https://www.linkedin.com/in/thomas-ramillon-0b584611b"}>
        <Image width={30} height={30} src={linkedin} alt='linkedin' />
        </Link>
    </div>
  )
}
