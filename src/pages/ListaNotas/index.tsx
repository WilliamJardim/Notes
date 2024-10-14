import { ReactComponentElement, useEffect, useState } from "react";
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nota from './Nota';
import Botao from "../Botao";
import ForumularioNota from "../FormularioNota";
import NotaNew from "./NotaNew";
import './ListaNotas.css';
import './Ajuda.scss';
import { ListaNotasContext } from '../../context/ListaNotasContext';
import DB from '../../DB/LocalDB';
import BarraPesquisa from "./BarraPesquisa";

function ListaNotas() {

    const context = useContext(ListaNotasContext);

    //Cria uma instancia do DB
    const LocalDB     = new DB({
        tableName: 'dados'
    });

    // Verifica se o contexto é undefined e lança um erro se for o caso
    if (!context) {
        throw new Error("ListaNotas deve ser usado dentro de um ListaNotasProvider");
    }

    const { dadosNotas, 
            setDadosNota, 
            adicionarNota, 
            excluirNota, 
            compartilharNota, 
            selecionarNota, 
            limparSelecaoNota, 
            isNotaSelecionada, 
            notaSelecionada } = context;

    useEffect(() => {
        console.log('Renderizou com a nota selecionada:', notaSelecionada, isNotaSelecionada());
    }, [notaSelecionada]);

    const navigate = useNavigate();
    
    if( localStorage.getItem('dados') == undefined )
    {
        localStorage.setItem('dados', JSON.stringify(dadosNotas) );
    }

    //Baixas as notas
    useEffect(function(){
        context.carregarNotas();
    }, [])

    const notasPorLinha = 4;

    function editarNota(): void{
       if( isNotaSelecionada() ){
           const idNota:string = notaSelecionada!.id;
           navigate(`/editar-nota/${ idNota }/false`);
       }
    }

    function onPesquisar( busca:string ): void{
        if( busca.trim() != '' )
        {
            let query = LocalDB.find( busca );
            context?.setDadosNota( query );

        }else{
            context?.setDadosNota( LocalDB.selectAll() );
        }
    }

    let notasRenderizadas = 0;
    let notasRenderizadasUltimaLinha = 0;
    let linhasRenderizadas = 0;
    let notasFaltam:number[] = [1];

    return (
        
            <div className="lista-notas">
                <div className="coluna coluna-notas">
                    <h1>Veja suas anotações</h1>

                    <BarraPesquisa onPesquisar={onPesquisar} />
                    
                    <div className="notes-grid">

                        {
                            dadosNotas.map( (dados:any)=>{
                                notasRenderizadas++;
                                notasRenderizadasUltimaLinha++

                                if( notasRenderizadasUltimaLinha > notasPorLinha ){
                                    linhasRenderizadas++;
                                    notasRenderizadasUltimaLinha = 0;
                                }

                                if( notasRenderizadas == dadosNotas.length ){
                                    //Terminou de desenhar todas as notas
                                    let diffNotas = Math.abs( notasRenderizadas - notasPorLinha );
        
                                    //Se falta alguns slots de notas a serem preenchidos
                                    if( diffNotas > 0 ){
                                        notasFaltam.push( 1 );
                                    }
                                }

                                return <Nota id={ dados.id }
                                             titulo={ dados.titulo }
                                             conteudo={ dados.conteudo }
                                             selecionarNota={ selecionarNota }/>
                            })
                        }

                        {
                            //Completa as notas que faltam
                            notasFaltam.map(()=>{
                                return <NotaNew selecionarNota={ selecionarNota }
                                                adicionarNota={ adicionarNota }
                                    />
                            })
                        }


                    </div>
                    
                </div>

                {
                    isNotaSelecionada() &&
                    <div className="coluna coluna-previa">
                        <div>
                    
                            <h2> Prévia da nota selecionada </h2>
                            
                            <ForumularioNota tituloValue={ notaSelecionada.titulo } 
                                             conteudoValue={ notaSelecionada.conteudo } 
                                             readOnly={true} 
                                             hideColor={true} />

                        </div>

                        <div className="botoes-resumo-nota">
                            
                            <Botao funcao={editarNota}
                                texto='Editar'
                                icone='FaPencil'
                                cor='azul'
                                tipo='edit' />

                            <Botao funcao={compartilharNota}
                                texto='Compartilhar'
                                icone='FaRegShareFromSquare'
                                cor='azul'
                                tipo='edit' />

                            <Botao funcao={excluirNota}
                                texto='Excluir'
                                icone='FaRegTrashCan'
                                cor='vermelho'
                                tipo='edit' />

                
                        </div>
                    </div>
                }

                {
                    //Caso não tenha nada selecionado, mostra outra coisa
                    !isNotaSelecionada() &&
                    <div className="coluna coluna-previa pagina-ajuda">
                        <div>
                            <h2> Bem vindo ao app de anotações! </h2>
                            <p className='paragrafo'> 
                                <span className="texto">
                                    Aqui você pode salvar suas ideias para ver depois.
                                    E evitar de esqueçer o que é importante para você.  
                                    Veja como é simples usar isso!
                                </span>
                            </p>

                            <h2> Criar Anotação </h2>
                            <p className='paragrafo'> 
                                <span className="texto">
                                    Para criar um cubo de anotação, basta clicar no simbolo de adicionar na própia lista
                                </span>
                            </p>

                            <h2> Visualizar </h2>
                            <p className='paragrafo'> 
                                <span className="texto">
                                    Para visualizar uma nota basta clicar em cima do bloquinho dela.
                                </span>
                            </p>

                            <h2> Editar </h2>
                            <p className='paragrafo'> 
                                <span className="texto">
                                    Para uma nota selecionada, basta clicar no botão editar.
                                </span>
                            </p>

            
                        </div>

                    </div>
                }
            </div>
        
    )
}

export default ListaNotas;