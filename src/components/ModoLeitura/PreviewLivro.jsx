import React, { useState } from 'react'
import btnAdd from './../../assets/images/+.png'
import * as pdfjsLib from 'pdfjs-dist'
import "./PreviewLivro.css"

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PreviewLivro = () => {

  const [pdfCover, setPdfCover] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const OpenModal = () => {
    setIsModalOpen(true);
  }

  const CloseModal = () => {
    setIsModalOpen(false);
  }

  //Funções do PDF
  const fileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf"){
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const pdfData = new Uint8Array(fileReader.result);

        try{
          //Carregar pdf
          const pdf = await pdfjsLib.getDocument(pdfData).promise;
          const page = await pdf.getPage(1);

          //config do canvas para renderizar a capa
          const viewport = page.getViewport({scale: 1.5});
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');

          await page.render({ canvasContext: context, viewport }).promise;
          const imgUrl = canvas.toDataURL();
          setPdfCover(imgUrl);
        } catch (error) {
          console.error("Erro ao renderizar PDF: ", error)
        }  
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className='container_Preview'>
      <p>Adicione os Seus Livros PDF’s ou PUB’s:</p>
        <button className='BtnAdd_leitura' onClick={OpenModal}>
          <img src={btnAdd} alt="botão +" className='btnAdd_leitura' />
        </button>
      <p>Sua Biblioteca:</p>
      <div className='Livros_Adicionados'>
        <p style={{fontStyle: 'italic'}}>Sem livros adicionados até o momento, adicione livros na sua biblioteca e comece a sua Jornada no Universo da Leitura!</p>
      </div>

      {isModalOpen && (
        <div className="modalAddLivro_bg">
          <div className="modalAddLivro_conteudo">
            <button className='BtnFechar_modalAddLivro' onClick={CloseModal}>X</button>
            <div className="conteudo_Livro">
              <h1 className='title_addLivro'>CLIQUE PARA ADICIONAR O LIVRO</h1>
              <label className='Label_AddLivro'>
                {pdfCover ? (
                  <img src={pdfCover} alt="Capa do PDF" className='Btnmais_Livro' />
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
              <button className='BtnAdd_livro'>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default PreviewLivro