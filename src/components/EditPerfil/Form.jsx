import ImgPerfil from '../../assets/images/imagePerfil.png'
import './Form.css'

const Form = () => {
  return (

    <div className='DivPerfil'>
        <form action="">
            <input type="file" name="" id="" />
            <input type="text" />
            <div className="Linha">
                <input type="email" name="" id="" placeholder='Usuario@novo.com'/>
                <input type="tel" name="" id="" />
            </div>
            <button type="submit">SALVAR</button>
        </form>
    </div>
  )
}

export default Form