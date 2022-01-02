import React from 'react';
import ListaVazia from '../assets/icones/lista-vazia.svg'

export const Listagem = () =>{
    return(
        <div className='container-listagem'>
            <img src={ListaVazia} alt="Nenhuma atividade encontrada"/>
            <p>Você ainda não possui tarefas cadastradas!</p>
        </div>
    )
}