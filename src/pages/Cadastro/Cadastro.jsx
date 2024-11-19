import React from 'react'
import './Cadastro.css'
import FormCadastro from "../../components/Cadastro/FormCadastro"

const Cadastro = (props) => {
    return (
        <>
        <div className='body_cadastro' style={!props.lightmode ? {backgroundColor: "#f2f2f2" }: null}>
            <FormCadastro lightmode={props.lightmode}/>
        </div>
        </>
    )
}

export default Cadastro