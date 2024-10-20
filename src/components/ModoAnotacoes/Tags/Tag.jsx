import React from 'react'
import './Tag.css'

const Tag = (props) => {
  return (
    <div className='checkboxTags'>
        <input type='checkbox' name={props.nomeTag}/>
        <label for={props.nomeTag}>{props.nomeTag}</label>
    </div>
  )
}

export default Tag