import { IconType } from 'react-icons';
import './Botao.scss';
import { FaPencil, FaRegTrashCan, FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import { createElement } from 'react';
import { ReactElement } from 'react';

export default function Botao( props:any ){
    let {tipo, texto, icone, cor, funcao} = props;

    function getIcone(nomeIcone: string): ReactElement{
        let retorno = createElement('Nada', '');

        switch( nomeIcone ){
            case 'FaPencil':
                return (
                    <FaPencil className='icone'/>
                );
                break;
                
            case 'FaRegTrashCan':
                return (
                    <FaRegTrashCan className='icone'/>
                );
                break;

            case 'FaRegShareFromSquare':
                return (
                    <FaRegShareFromSquare className='icone'/>
                );
                break;

            case 'FaRegQuestionCircle':
                return (
                    <FaRegQuestionCircle className='icone'/>
                );
                break;

            case 'FaFloppyDisk':
                return (
                    <FaFloppyDisk className='icone'/>
                )
                break;

            case 'FcSearch':
                return (
                    <FcSearch className='icone'/>
                )
                break;
        }

        return (retorno);
    }

    return (
        <button className={`botao ${ tipo } botao-${cor}`} onClick={ funcao }>
           { getIcone(icone) } { texto }
        </button>
    )
}