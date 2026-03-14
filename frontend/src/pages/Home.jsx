import React from 'react'
import Navbar from '../components/home/Navbar'
import HeroSection from '../components/home/HeroSection'
import FeaturesSection from '../components/home/FeaturesSection'
import ProblemSection from '../components/home/ProblemSection'
import HowItWorks from '../components/home/HowItWorks'
import DemoSection from '../components/home/DemoSection'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <FeaturesSection/>
        <ProblemSection/>
        <HowItWorks/>
        <DemoSection/>
        <Footer/>
    </div>
  )
}

export default Home