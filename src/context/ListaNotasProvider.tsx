import { ReactNode, useState } from "react";
import { ListaNotasContext } from './ListaNotasContext';

interface MyProviderProps {
  children: ReactNode;
}

const ListaNotasProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [dadosNotas, setDadosNota] = useState<any[]>([]); // Estado para as notas
  const [notaSelecionada, setNotaSelecionada] = useState<{ id: string, titulo: string, conteudo: string }>({
    id: '',
    titulo: '',
    conteudo: '',
  });

  // Implementação das funções
  const adicionarNota = (dadosNovaNota: any): void => {
    let novoArray = [...dadosNotas, dadosNovaNota];
    setDadosNota(novoArray);
    localStorage.setItem('dados', JSON.stringify(novoArray));
  };

  const selecionarNota = (nota: any, dadosNota:any): void => {
    const idNota: string = dadosNota.id;
    const titulo: string = dadosNota.titulo;
    const conteudo: string = dadosNota.conteudo;

    setNotaSelecionada({...{
      id: idNota,
      titulo: titulo,
      conteudo: conteudo,
    }});

  };

  const limparSelecaoNota = (): void => {
    setNotaSelecionada({ id: '', titulo: '', conteudo: '' });
  };

  const isNotaSelecionada = (): boolean => {
    return notaSelecionada.id !== '';
  };

  const excluirNota = (): void => {
    if (notaSelecionada.id) {
      const novasNotas = dadosNotas.filter(nota => nota.id !== notaSelecionada.id);
      setDadosNota(novasNotas);
      localStorage.setItem('dados', JSON.stringify(novasNotas));
      limparSelecaoNota();
    }
  };

  const compartilharNota = (): void => {
    if (isNotaSelecionada()) {
      console.log('Nota compartilhada:', notaSelecionada);
    } else {
      console.log('Nenhuma nota selecionada para compartilhar');
    }
  };

  const carregarNotas = (): any => {
    //Carrega as notas do banco de dados e atualiza os states
    let dadosNotas:any = JSON.parse(localStorage.getItem('dados')!);
    setDadosNota( dadosNotas );
    return dadosNotas;
  }

  return (
    <ListaNotasContext.Provider
      value={{
        dadosNotas,
        setDadosNota,
        carregarNotas,
        adicionarNota,
        selecionarNota,
        limparSelecaoNota,
        isNotaSelecionada,
        notaSelecionada,
        excluirNota,
        compartilharNota,
      }}
    >
      {children}
    </ListaNotasContext.Provider>
  );
};

export { ListaNotasProvider };
