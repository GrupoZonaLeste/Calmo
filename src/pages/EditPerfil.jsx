import SideBar from '../components/Sidebar/SideBar'
import Form from '../components/EditPerfil/Form'
import './EditPerfil.css'

const EditPerfil = () => {
  return (
    <div className='container_editPerfil'>
        <SideBar />
        <div className="DivEdtPerfil">
          <Form />
        </div>
    </div>
  )
}

export default EditPerfil