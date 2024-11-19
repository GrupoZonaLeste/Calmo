import React from 'react'
import { Link } from 'react-router-dom'
import './DivSobre.css'
import '../../index.css'

const DivSobre = (props) => {
    return (
        <>
            <div className='divSobre'>
                <div className='divSobreGrid'>
                    <div className='cards SobreCard1' style={!props.lightmode ? {color: "#212121", border: "0.1em solid black", backgroundColor: "#fffff" }: null}>
                        <h2>Sobre o Calmô!✋</h2>
                        <p>
                        Na correria do dia a dia, é fácil se perder em um turbilhão de tarefas e responsabilidades. O Calmô te ajuda a encontrar o equilíbrio perfeito entre produtividade e bem-estar. Com nossas ferramentas e técnicas personalizadas, você aprenderá a gerenciar seu tempo de forma eficiente, reduzir o estresse e aumentar sua criatividade. Desenvolva hábitos saudáveis e alcance seus objetivos com mais calma e foco.
                        <br></br>
                        <br></br>
                        Faça parte de uma comunidade de pessoas que, assim como você, buscam uma vida mais equilibrada e produtiva. Compartilhe suas experiências, aprenda com outras pessoas e encontre a motivação para seguir em frente. Juntos, vamos construir uma vida mais leve e significativa.
                        </p>
                    </div>
                    <div className='cards SobreCard2'  style={!props.lightmode ? {color: "#212121", border: "0.1em solid black", backgroundColor: "#fffff" }: null}>
                        <h2>Pra quem é o Calmô!✋</h2>
                        <p>
                        A produtividade não precisa ser complicada. O Calmô oferece soluções simples e eficazes para te ajudar a organizar suas ideias, otimizar suas tarefas e alcançar seus objetivos. Nosso site é um guia prático e intuitivo para quem busca uma vida mais produtiva e menos estressante. Descubra como pequenas mudanças podem fazer uma grande diferença em sua rotina.
                        <br></br>
                        <br></br>
                        O Calmô é mais do que apenas um site, é seu parceiro pessoal na jornada pela produtividade. Nosso conteúdo é adaptado às suas necessidades e objetivos específicos, oferecendo dicas e ferramentas personalizadas para você alcançar o sucesso em todas as áreas da sua vida.
                        </p>
                    </div>
                    <div className='cards SobreCard3'  style={!props.lightmode ? {color: "#212121", border: "0.1em solid black", backgroundColor: "#fffff" }: null}>
                        <h2>Quer Atividades? Calmô!✋</h2>
                        <ul>
                            <li className='liSobre'>📝 Anote tudo do seu jeito!</li><br></br>
                            <li className='liSobre'>🎸 Ouça suas músicas preferidas!</li><br></br>
                            <li className='liSobre'>🥗 Gerencie suas dietas e treinos!</li><br></br>
                            <li className='liSobre'>📆 Se organize na sua agenda!</li><br></br>
                        </ul>
                    </div>
                    <div className='cards SobreCard4'  style={!props.lightmode ? {color: "#212121", border: "0.1em solid black", backgroundColor: "#fffff" }: null}>
                        <h2>Primeira Vez? 🤩</h2>
                        <div className="btn_pv_Landing">
                            <Link to="/cadastro" className='btn_primeiravez_Landing'><p>CLIQUE AQUI PARA CRIAR UMA CONTA</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DivSobre