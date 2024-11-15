import React, { useState, useEffect } from 'react'
import btnAdd from './../../assets/images/+.png'
import * as pdfjsLib from 'pdfjs-dist'
import "./PreviewLivro.css"

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PreviewLivro = () => {

  const [pdfCover, setPdfCover] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [livros, setLivros] = useState([]); 

  const OpenModal = () => {
    setIsModalOpen(true);
  }

  const CloseModal = () => {
    setIsModalOpen(false);
  }

  
  useEffect(() => {
    const fetchLivros = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/obter-livros');
            if (!response.ok) {
                throw new Error('Erro ao buscar livros');
            }
            const data = await response.json();
            setLivros(data);  // Supondo que os livros retornem com a URL da capa
        } catch (error) {
            console.error(error.message);
        }
    };

    fetchLivros();
}, []);

const handleLivroClick = (livroId) => {
  // Aqui, ao clicar no livro, buscamos o PDF correspondente
  fetch(`http://localhost:5000/api/livro/${livroId}`)
    .then(response => response.blob())
    .then(pdfBlob => {
      setSelectedPdf(URL.createObjectURL(pdfBlob));
      OpenModal(); // Abrir modal para visualizar o PDF
    })
    .catch(error => console.error('Erro ao abrir o PDF:', error));
};

  //Funções do PDF
  const fileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Arquivo selecionado:", file);

    if (file && file.type === "application/pdf"){
      setPdfFile(file); //armazena no estado o pdf selecionado

      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const pdfData = new Uint8Array(fileReader.result);
        console.log("Dados do PDF carregados:", pdfData);

        try{
          //Carregar pdf
          const pdf = await pdfjsLib.getDocument(pdfData).promise;
          console.log("Documento PDF carregado: ", pdf)

          const page = await pdf.getPage(1);
          console.log("Página do PDF carregado:", page)

          //config do canvas para renderizar a capa
          const viewport = page.getViewport({scale: 1.5});
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');

          await page.render({ canvasContext: context, viewport }).promise;
          const imgUrl = canvas.toDataURL();
          console.log("Imagem de capa do PDF: ", imgUrl);
          
          setPdfCover(imgUrl);
        } catch (error) {
          console.error("Erro ao renderizar PDF: ", error)
        }  
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      console.warn("Arquivo selecionado não é um PDF válido:");
    }
  };

  const adicionarLivro = () => {
    const titulo = document.querySelector('.input_tituloLivro').value;
    const autor = document.querySelector('.input_autorLivro').value;

    if(!titulo || !autor || !pdfFile){
      alert("Preencha Todos os Campos");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("autor", autor);
    formData.append("pdf", pdfFile); //envia o pdf

    fetch("http://localhost:5000/api/salvar-livro", {
      method:"POST",
      body: formData,
    })

    .then(response => response.json())
    .then(data => {
      alert(data.status);
            setPdfFile(null); // Limpar estado do arquivo PDF
            setPdfCover(null); // Limpar visualização da capa
            document.querySelector('.input_tituloLivro').value = '';
            document.querySelector('.input_autorLivro').value = '';
            CloseModal(true);
            setLivros([...livros, { titulo, autor, capa: pdfCover }]);
    })

    .catch(error => {
      console.error("Erro ao Adicionar Livro:", error);
    })
    .finally(() => setLoading(false));
  };

  return (
    <div className='container_Preview'>
      <p>Adicione os Seus Livros PDF’s ou PUB’s:</p>
        <button className='BtnAdd_leitura' onClick={OpenModal}>
          <img src={btnAdd} alt="botão +" className='btnAdd_leitura' />
        </button>
      <p>Sua Biblioteca:</p>
      <div className='Livros_Adicionados'>
      {livros.length === 0 ? (
          <p style={{ fontStyle: 'italic' }}>
            Sem livros adicionados até o momento, adicione livros na sua biblioteca e comece a sua Jornada no Universo da Leitura!
          </p>
        ) : (
          <div className="livros_carousel">
            {livros.map((livro, index) => (
              <div
                key={livro.id || livro.titulo} onClick={() => handleLivroClick(livro.id)}>
                <img
                  src={`data:image/jpeg;base64,${livro.capa}`}
                  alt={livro.titulo}
                  className="livro_capa"
                />
                <p className="livro_titulo">{livro.titulo}</p>
                <p className="livro_autor">{livro.autor}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modalAddLivro_bg">
          <div className="modalAddLivro_conteudo">
            <button className='BtnFechar_modalAddLivro' onClick={CloseModal}>X</button>
            <div className="conteudo_Livro">
              <h1 className='title_addLivro'>CLIQUE PARA ADICIONAR O LIVRO</h1>
              <label className='Label_AddLivro'>
                {pdfCover ? (
                  <img src={pdfCover} alt="Capa do PDF" 
                  className='Btnmais_Livro' style={{height: "97%", width:"97%", borderRadius:"1vw"}}/>
                ) : (
                  <img src={btnAdd} alt="botão +" className='Btnmais_Livro'/>
                )}
                <input type="file" accept='.pdf' className='input_addLivro' onChange={fileChange} />
                <span></span>
              </label>
              <div className="inputs_AddLivro">
                <div className="input_tituloAddLivro">
                  <label>Titulo:</label>
                  <input type="text" placeholder='Digite o nome do livro' className='input_tituloLivro'/>
                </div>
                <div className="input_autorAddLivro">
                  <label >Autor:</label>
                  <input type="text" placeholder='Digite o nome do autor' className='input_autorLivro' />
                </div>
              </div>
              <button className="BtnAdd_livro" onClick={adicionarLivro} disabled={loading}>
                {loading ? 'Carregando...' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default PreviewLivro