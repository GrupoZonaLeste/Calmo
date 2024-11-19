import SideBar from '../../components/Sidebar/SideBar'
import Form from '../../components/EditPerfil/Form'
import './EditPerfil.css'

const EditPerfil = (props) => {
  return (
    <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f2f2f2",color: "#212121"}: null}>
        <SideBar lightmode={props.lightmode}/>
        <div className="DivEdtPerfil">
          <Form />
        </div>
    </div>
  )
}

export default EditPerfil