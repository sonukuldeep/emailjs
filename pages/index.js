import Head from 'next/head';
import styles from '../styles/Home.module.scss'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

export default function Home() {
  const form = useRef()

  function handleOnSubmit(e) {
    e.preventDefault();

    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        e.target.reset()
      })
      .catch((error) => {
        console.log(error.text);
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact me for cool stuff!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div >
          <form onSubmit={handleOnSubmit} ref={form} className={styles.flex}>
            <h1 className={styles.title}>
              Contact Me
            </h1>
            <p className={styles.card}>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="from_name" />
            </p>
            <p className={styles.card}>
              <label htmlFor="email">Email</label>
              <input id="email" type="text" name="from_email" />
            </p>
            <p className={styles.card}>
              <label htmlFor="subject">Subject</label>
              <input id="name" type="text" name="subject" />
            </p>
            <p className={styles.card}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" />
            </p>
            <p>
              <button>Submit</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
