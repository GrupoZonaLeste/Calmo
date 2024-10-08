import React from 'react'

import './LandingPage.css'
import Header from "../components/LandingPage/Header"
import DivHero from "../components/LandingPage/DivHero"
import DivSobre from "../components/LandingPage/DivSobre"
import Footer from "../components/LandingPage/Footer"

const LandingPage = () => {
    return (
        <>
            <Header/>
            <DivHero />
            <DivSobre/>
            <Footer/>
        </>
    )
}

export default LandingPage