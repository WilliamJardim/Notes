import React from 'react';
import './Nota.scss';

export default function Nota(props: any){

    const {id, titulo, conteudo} = props;

    const selecionarNota = function( event:any ){
        props.selecionarNota(event, props);
    }

    return (
        <div id={ id } className="nota note-block" onClick={ selecionarNota }>
            
            <div className='note-block-header'>
                <h2> { titulo } </h2>
            </div>

            <div className='note-block-content'>
                <text> { conteudo } </text>
            </div>

        </div>
    )
}