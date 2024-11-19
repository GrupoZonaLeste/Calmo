<script src="http://localhost:8097"></script>
import React from 'react'
import './LandingPage.css'
import Header from "../../components/LandingPage/Header"
import DivHero from "../../components/LandingPage/DivHero"
import DivSobre from "../../components/LandingPage/DivSobre"
import Footer from "../../components/LandingPage/Footer"

const LandingPage = (props) => {
    return (
        <>
        <div className='body_landing'>
            <Header lightmode={props.lightmode}/>
            <DivHero lightmode={props.lightmode}/>
            <DivSobre lightmode={props.lightmode}/>
            <Footer lightmode={props.lightmode}/>
        </div>
        </>
    )
}

export default LandingPage