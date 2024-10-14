import { useState } from "react";
import Botao from "../../Botao";
import './BarraPesquisa.scss';

export default function BarraPesquisa( props:any ){

    let [buscaValue, setBuscaValue] = useState('');

    function onChangeCampo( event:any ): void{
        setBuscaValue( event.target.value );
        props.onPesquisar( event.target.value );
    }

    return (
        <div className="campo-pesquisa">

            <input name="busca" placeholder="Pesquise aqui" value={buscaValue} onChange={onChangeCampo}/>

            <Botao texto='Buscar'
                   cor="cinza"
                   icone="FcSearch"
                   funcao={ props.onPesquisar }

            />
        </div>
    );
}