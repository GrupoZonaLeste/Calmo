import React from 'react'
import './Login.css'
import FormLogin from "../../components/FormLogin/FormLogin"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const Cadastro = () => {
    return (
        <>
        <div className='body_login'>
            <FormLogin/>
        </div>
        </>
    )
}

export default Cadastro