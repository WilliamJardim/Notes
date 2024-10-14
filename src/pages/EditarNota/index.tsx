import Botao from '../Botao';
import ForumularioNota from '../FormularioNota';
import './EditarNota.css';
import { useParams } from 'react-router';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ListaNotasContext } from '../../context/ListaNotasContext';
import DB from '../../DB/LocalDB';
import Nota from '../../interfaces/Nota';

function EditarNota() {

    const params      = useParams();
    const navigate    = useNavigate();

    //Cria uma instancia do DB
    const LocalDB     = new DB({
        tableName: 'dados'
    });

    const {id, isnew} = params;

    const context = useContext(ListaNotasContext);

    // Verifica se o contexto é undefined e lança um erro se for o caso
    if (!context) {
        throw new Error("ListaNotas deve ser usado dentro de um ListaNotasProvider");
    }

    const dadosNotas = LocalDB.selectAll();
    
    const dadosNotaSelecionada = dadosNotas.filter((nota:any)=>{ if( nota.id == id ){ return nota } })[0];

    const [tituloAtual,   setTituloAtual] = useState( dadosNotaSelecionada.titulo );
    const [conteudoAtual, setConteudo]    = useState( dadosNotaSelecionada.conteudo );

    function onSalvar( event:any ){
        
        let novoRecord = {
           id: id,
           titulo: tituloAtual,
           conteudo: conteudoAtual
        }

        //Faz a persistencia no banco de dados
        LocalDB.persistExistantRecord( novoRecord as Nota );

        //Atualiza a lista
        context!.carregarNotas();

        //Volta para a pagina inicial
        navigate('/');
    }   

    function onCancelar( event:any ){
        navigate('/');
    }

    return (
        <div className="editar-nota">

            <ForumularioNota tituloValue={ tituloAtual }
                             setTituloValue={ setTituloAtual }
                             conteudoValue={ conteudoAtual }
                             setConteudoValue={ setConteudo }
                             readOnly={false}
            />

            <div className='botoes'>

                <Botao texto="Salvar"
                       cor="verde"
                       icone="FaFloppyDisk"
                       funcao={ onSalvar } />

                <Botao texto="Cancelar"
                       cor="vermelho"
                       icone="FaFloppyDisk"
                       funcao={ onCancelar } />

            </div>

        </div>
    )
}

export default EditarNota;