import React from 'react'
import Hero from '../component/Hero.jsx'
import Navbar from '../component/Navbar.jsx'
import Features from '../component/Features.jsx'
import Footer from '../component/Footer.jsx'
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}
