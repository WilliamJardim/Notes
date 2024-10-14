import { Fragment } from "react/jsx-runtime"
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ListaNotasContext } from '../../context/ListaNotasContext';
import './FormularioNota.scss';

export default function ForumularioNota( props:any ){
    let { tituloValue, 
          setTituloValue,
          conteudoValue,
          setConteudoValue, 
          readOnly,
    } = props;

    const hideColor = props.hideColor || false;

    const context = useContext(ListaNotasContext);

    // Verifica se o contexto é undefined e lança um erro se for o caso
    if (!context) {
        throw new Error("ListaNotas deve ser usado dentro de um ListaNotasProvider");
    }

    function onChangeField( event: any ){
        const { name, value } = event.target;
        
        // Atualiza o campo correto com base no nome
        if (name === "titulo") {
            setTituloValue(value);
        } else if (name === "conteudo") {
            setConteudoValue(value);
        }

        // Chama a função de callback onChange se existir
        if (props.onChange) {
            props.onChange(event);
        }
    }

    return (
        <div className="formulario-nota coluna">
            <div className="form-container">
                <div>
                    {
                        readOnly == true 
                        ? <input name="titulo" placeholder='Titulo' value={ tituloValue } onChange={onChangeField} readOnly/> 
                        : <input name="titulo" placeholder='Titulo' value={ tituloValue } onChange={onChangeField} /> 
                    }
                </div>
                
                <div>
                    {
                        readOnly == true 
                        ? <textarea name="conteudo" placeholder='Conteudo' value={ conteudoValue } onChange={onChangeField} readOnly/>
                        : <textarea name="conteudo" placeholder='Conteudo' value={ conteudoValue } onChange={onChangeField} />
                    }
                </div>
            </div>

            {
                !hideColor && 
                <div className="form-container">
                    <div className="form-cores">
                        <h3>Escolha uma cor:</h3>
                        <label>
                            <input type="radio" name="opcao" value="azul"/>
                            Azul
                        </label>
                    
                        <label>
                            <input type="radio" name="opcao" value="verde"/>
                            Verde
                        </label>

                        <label>
                            <input type="radio" name="opcao" value="amarelo"/>
                            Amarelo
                        </label>
                    </div>
                </div>
            }

        </div>
    );
}