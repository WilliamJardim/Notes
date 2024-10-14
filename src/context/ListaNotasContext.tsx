import React, { useState, ReactNode, createContext } from 'react';

// Definir os tipos para o valor do contexto
interface ListaNotasContextType {
  dadosNotas: any,
  setDadosNota: any,
  carregarNotas: any,
  adicionarNota: (dadosNovaNota: any) => void;
  selecionarNota: (nota: any, dadosNota:any) => void;
  limparSelecaoNota: () => void;
  isNotaSelecionada: () => boolean;
  notaSelecionada: any,
  excluirNota: () => void;
  compartilharNota: () => void;
}

// Criar o contexto com valor inicial indefinido (undefined)
export const ListaNotasContext = createContext<ListaNotasContextType | undefined>(undefined);