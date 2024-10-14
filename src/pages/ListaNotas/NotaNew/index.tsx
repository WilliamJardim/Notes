import React from 'react';
import './NotaNew.scss';
import { IoIosAddCircleOutline } from "react-icons/io";

export default function NotaNew(props: any){
    const novoId = String( Math.random() ).replace('.', '');

    const selecionarNota = function( evento:any ){
        evento.target.id = novoId;

        props.adicionarNota({
            id: novoId,
            titulo: 'Vazio',
            conteudo: 'Vazio'
        });
        
        props.selecionarNota( evento );
    };

    return (
        <div className="nota note-block note-block-empty" onClick={ selecionarNota }>
            
            <div className='note-block-new'>
                <IoIosAddCircleOutline />
            </div>

        </div>
    )
}