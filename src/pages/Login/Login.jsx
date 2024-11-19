import React from 'react'
import './Login.css'
import FormLogin from "../../components/FormLogin/FormLogin"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const Cadastro = (props) => {
    return (
        <>
        <div className='body_login' style={!props.lightmode ? {backgroundColor: "#f2f2f2" }: null}>
            <FormLogin lightmode={props.lightmode}/>
        </div>
        </>
    )
}

export default Cadastro