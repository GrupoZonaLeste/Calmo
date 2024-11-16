import React, { useState, useEffect, useRef } from 'react'
import btnAdd from './../../assets/images/+.png'
import * as pdfjsLib from 'pdfjs-dist'
import "./PreviewLivro.css"
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.mjs';


const PreviewLivro = () => {

  const [pdfCover, setPdfCover] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [livros, setLivros] = useState([]); 


  const [selectedPdf, setSelectedPdf] = useState(null);
  const canvasRef = useRef(null);  // Referência para o canvas
  const [pageNumber, setPageNumber] = useState(1); // Número da página

  const OpenModal = () => {
    setIsModalOpen(true);
  }

  const CloseModal = () => {
    setIsModalOpen(false);
  }

  //Funções do PDF
  const fileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Arquivo selecionado:", file);

    if (file && file.type === "application/pdf") {
        setPdfFile(file); // armazena o pdf selecionado

        const fileReader = new FileReader();

        fileReader.onload = async () => {
            const pdfData = new Uint8Array(fileReader.result);
            console.log("Dados do PDF carregados:", pdfData);

            try {
                // Carregar o PDF
                const pdf = await pdfjsLib.getDocument(pdfData).promise;
                console.log("Documento PDF carregado: ", pdf);

                const page = await pdf.getPage(1);
                console.log("Página do PDF carregada:", page);

                // Configuração do canvas para renderizar a capa
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext('2d');

                await page.render({ canvasContext: context, viewport }).promise;
                const imgUrl = canvas.toDataURL();
                console.log("Imagem de capa do PDF: ", imgUrl);

                setPdfCover(imgUrl);
            } catch (error) {
                console.error("Erro ao renderizar PDF: ", error);
            }
        };

        fileReader.readAsArrayBuffer(file);
    } else {
        console.warn("Arquivo selecionado não é um PDF válido.");
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

    
  useEffect(() => {
    const fetchLivros = async () => {
        try {
          console.log("Buscando livros...");
            const response = await fetch('http://localhost:5000/api/obter-livros');
            if (!response.ok) {
                throw new Error('Erro ao buscar livros');
            }
            const data = await response.json();
            console.log("Livros recebidos:", data);
            setLivros(data);  // Supondo que os livros retornem com a URL da capa
        } catch (error) {
            console.error(error.message);
        }
    };

    fetchLivros();
}, []);

const handleLivroClick = (livroId) => {

  console.log("Livro clicado:", livroId);
  // Aqui, ao clicar no livro, buscamos o PDF correspondente
  fetch(`http://localhost:5000/api/obter-pdf/${livroId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro ao buscar PDF: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const pdfUrl = data.pdfUrl;
    console.log('URL do PDF recebido:', pdfUrl);
    setSelectedPdf(`http://localhost:5000${pdfUrl}`);
  })
  .catch(error => console.error('Erro ao abrir o PDF:', error));
};

const renderPdf = async (pdfUrl) => {
  // Carregar o PDF
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  // Obter a página
  const page = await pdf.getPage(pageNumber);

  // Configurar o contexto do canvas
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  // Definir a escala de renderização
  const scale = 1.5; // Tamanho da página
  const viewport = page.getViewport({ scale });

  // Definir as dimensões do canvas
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // Renderizar a página no canvas
  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;
};

// Carregar e renderizar o PDF sempre que a URL mudar
useEffect(() => {
  if (selectedPdf) {
    renderPdf(selectedPdf);
  }
}, [selectedPdf, pageNumber]);

const handleClosePdf = () => {
  fetch('http:/localhost:5000/api/livro/deletar-pdf', {
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ filePath: selectedPdf}),
  })
  .then(response => response.json())
  .then(() => {
    setSelectedPdf(null);
  })
  .catch(error => console.error('Erro ao deletar o arquivo PDF:', error));
};

  return (
    <div className='container_Preview'>
      <p>Adicione os Seus Livros PDF’s:</p>
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
            {livros.map((livro) => (
              <div
                key={livro._id || livro.titulo} 
                onClick={() => handleLivroClick(livro._id)}>
                <img
                  src={livro.capa ? `data:image/jpeg;base64,${livro.capa}` : btnAdd}
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

      {selectedPdf && (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
          {/* Botões para navegar entre as páginas */}
          <div>
            <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
              Página Anterior
            </button>
            <button onClick={() => setPageNumber(pageNumber + 1)}>
              Próxima Página
            </button>
          </div>
        </div>
      )}

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