import { useState, useEffect, useRef } from 'react'; // Importando o useRef
import { auth, db } from '../../services/firebase_config'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import ImgPerfil from '../../assets/images/imagePerfil.png';
import BtnEditar from '../../assets/images/btn_Edit.png';
import BtnVoltar from '../../assets/images/btn_voltar.png';
import { Link } from 'react-router-dom';
import './Form.css';

const Form = () => {
  
  const [image, setImage] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isEditableNome, setIsEditableNome] = useState(false);
  const [isEditableEmail, setIsEditableEmail] = useState(false);
  const [isEditableTel, setIsEditableTel] = useState(false);
  const [loading, setLoading] = useState(true); // Para controlar o carregamento dos dados

  // Referências de input
  const inputFileRef = useRef(null);
  const pictureRef = useRef(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true); // Inicia o carregamento dos dados

        // Buscar dados do Firestore com UID do usuário
        const userDocRef = doc(db, 'users', user.uid); // Assumindo que a coleção seja 'usuarios' com UID do usuário
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log(userData); // Verifique o conteúdo do documento
          setNome(userData.nome || ''); // Ajustando caso não tenha nome
          setEmail(userData.email || ''); // Ajustando caso não tenha email
          setTelefone(userData.telefone || ''); // Ajustando caso não tenha telefone
        } else {
          console.log('Documento não encontrado');
          console.log(user.nome)
          console.log('UID do usuário:', user.uid);  // Verifique o UID que está sendo passado para o Firestore

          setNome(user.displayName || ''); // Caso o nome não seja encontrado no Firestore, utilizar o nome do Firebase
          setEmail(user.email || ''); // Utilizando o email do Firebase
          setTelefone(''); // Deixar telefone vazio se não encontrado
        }
        

        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Limpar o listener quando o componente for desmontado
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Atualizar dados no Firestore
      await updateDoc(userDocRef, {
        nome,
        email,
        telefone,
      });

      // Sucesso na atualização
      alert('Dados atualizados com sucesso!');
    }
  };

  const toggleEditableNome = () => setIsEditableNome(!isEditableNome);
  const toggleEditableEmail = () => setIsEditableEmail(!isEditableEmail);
  const toggleEditableTel = () => setIsEditableTel(!isEditableTel);

  const handleBlurNome = () => setIsEditableNome(false);
  const handleBlurEmail = () => setIsEditableEmail(false);
  const handleBlurTel = () => setIsEditableTel(false);

  if (loading) {
    return <div>Carregando...</div>; // Exibir uma mensagem de carregamento enquanto os dados não são carregados
  }

  return (
    <div className='container_EditPerfil'>
      <Link to={"/home"}>
        <img src={BtnVoltar} alt="Voltar" className='BtnVoltar_EditPerfil' />
      </Link>
      <form className='form_EditPerfil' onSubmit={handleSave}>
        <label className='picture_FotoPerfil'>
          <input 
            type="file" 
            id="input_FotoPerfil" 
            className='input_FotoPerfil' 
            onChange={handleFileChange} 
            ref={inputFileRef} 
          />
          <span className='Span_picture_FotoPerfil' ref={pictureRef}>
            {image ? (
              <img src={image} alt="Foto de Perfil" className='picture_imgFotoPerfil' />
            ) : (
              "Escolha uma imagem"
            )}
          </span>
        </label>
        
        <div className="Linha">
          <input 
            type="text" 
            placeholder='Nome do Usuário' 
            className={`input_nomeEditPerfil ${isEditableNome ? 'editable' : ''}`} 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            readOnly={!isEditableNome} 
            onBlur={handleBlurNome} 
          />
          <button type='button' className='BtnEditar_EditPerfil' onClick={toggleEditableNome}>
            <img src={BtnEditar} alt="Editar" className='Img_LapisEdit'/>
          </button>
        </div>

        <div className="Linha-Down">
          <div className="Linha2">
            <input 
              type="email" 
              placeholder='Email' 
              className={`input_emailEditPerfil ${isEditableEmail ? 'editable' : ''}`} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              readOnly={!isEditableEmail} 
              onBlur={handleBlurEmail} 
            />
            <button type='button' className='BtnEditar_EditPerfil' onClick={toggleEditableEmail}>
              <img src={BtnEditar} alt="Editar" className='Img_LapisEdit'/>
            </button>
          </div>

          <div className="Linha3">
            <input 
              type="tel" 
              placeholder='Telefone' 
              className={`input_telEditPerfil ${isEditableTel ? 'editable' : ''}`} 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              readOnly={!isEditableTel} 
              onBlur={handleBlurTel} 
            />
            <button type='button' className='BtnEditar_EditPerfil' onClick={toggleEditableTel}>
              <img src={BtnEditar} alt="Editar" className='Img_LapisEdit'/>
            </button>
          </div>
        </div>

        <button type="submit" className='btnSalvar_EditPerfil'>SALVAR</button>
      </form>
    </div>
  );
}

export default Form;
