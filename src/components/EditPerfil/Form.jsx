import { useRef, useState, useEffect } from 'react'
import ImgPerfil from '../../assets/images/imagePerfil.png'
import BtnEditar from '../../assets/images/btn_Edit.png'
import BtnVoltar from '../../assets/images/btn_voltar.png'
import './Form.css'

const Form = () => {

  const [image, setImage] = useState(null)
  const inputFileRef = useRef(null);
  const pictureRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if(file){
      const reader = new FileReader()
      reader.onload= (e) =>{
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }else {
      setImage(null)
    }
  };

  useEffect(() => {
    if(!image){
      pictureRef.current.innerHTML = 'Choose an Image'
    }
  }, [image]);

  const [isEditableNome, setIsEditableNome] = useState(false);
  const [isEditableEmail, setIsEditableEmail] = useState(false);
  const [isEditableTel, setIsEditableTel] = useState(false);

  const [nome, setNome] = useState('Nome do Usuário')
  const [email, setEmail] = useState('UsuarioNovo@gmail.com');
  const [telefone, setTelefone] = useState('+55 (11) 91919-1919');

  const toggleEditableNome = () =>{
    setIsEditableNome(true);
  };

  const toggleEditableEmail = () =>{
    setIsEditableEmail(true);
  };

  const toggleEditableTel = () =>{
    setIsEditableTel(true);
  };

  const handleBlurNome = () => {
    setIsEditableNome(false);
  };

  const handleBlurEmail = () => {
    setIsEditableEmail(false);
  };

  const handleBlurTel = () => {
    setIsEditableTel(false);
  };

  return (

    <div className='container_EditPerfil'>
      <img src={BtnVoltar} alt="" className='BtnVoltar_EditPerfil' />
        <form action="" className='form_EditPerfil'>
          <label className='picture_FotoPerfil'>
            <input type="file" id="input_FotoPerfil" 
            className='input_FotoPerfil' onChange={handleFileChange} ref={inputFileRef}/>
            <span className='Span_picture_FotoPerfil' ref={pictureRef}>
              {image ? (
                <img src={image} alt="Foto de Perfil" className='picture_imgFotoPerfil'/>
              ) : (
                "Choose an Image"
              )}
            </span>
          </label>
            
          <div className="Linha">
            <input type="text" placeholder='Nome Do Usuário' className={`input_nomeEditPerfil ${isEditableNome ? 'editable' : ''}`}
            value={nome} onChange={(e) => setNome(e.target.value)} readOnly={!isEditableNome} onBlur={handleBlurNome}/>
            <button type='button' className='BtnEditar_EditPerfil' onClick={toggleEditableNome}>
              <img src={BtnEditar} alt="" className='Img_LapisEdit'/>
            </button>
          </div>
            
          <div className="Linha">
            <input type="email" name="" id="" placeholder='UsuarioNovo@gmail.com'
             className={`input_emailEditPerfil ${isEditableEmail ? 'editable' : ''}`}
             value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditableEmail} onBlur={handleBlurEmail}/>
            <button type='button' className='BtnEditar_EditPerfil' onClick={toggleEditableEmail}>
              <img src={BtnEditar} alt="" className='Img_LapisEdit'/>
            </button>
              
            <input type="tel" name="" id="" placeholder='+55 (11) 91919-1919' 
            className={`input_telEditPerfil ${isEditableTel ? 'editable' : ''}`}
            value={telefone} onChange={(e) => setTelefone(e.target.value)} readOnly={!isEditableTel}
            onBlur={handleBlurTel}/>
            <button type='button' className='BtnEditar_EditPerfil' onClick={toggleEditableTel}>
              <img src={BtnEditar} alt="" className='Img_LapisEdit'/>
            </button>
          </div>
          <button type="submit">SALVAR</button>
        </form>
    </div>
  )
}

export default Form;
