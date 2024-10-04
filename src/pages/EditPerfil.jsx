import SideBar from '../components/SideBar'
import Form from '../components/EditPerfil/Form'
import './EditPerfil.css'

const EditPerfil = () => {
  return (
    <div className='container'>
        <SideBar />
        <div className="DivEdtPerfil">
          <Form />
        </div>
    </div>
  )
}

export default EditPerfil