import React from 'react';
import ListaVazia from '../assets/icones/lista-vazia.svg'
import {Item} from './Item';

export const Listagem = props => {

    const { tarefas } = props;

    return (
        //Adiciona a classe container e verifica se existem tarefas, caso não exista adiciona classe vazia também para estilização no CSS e alinhamento de itens
        <div className={"container-listagem" + (tarefas && tarefas.length > 0 ? "" : "vazia")}>

            {tarefas && tarefas.length > 0 ?

                tarefas?.map(item => <Item tarefa={item} key={item.id}/>)
                :
                <>
                    <img src={ListaVazia} alt="Nenhuma atividade encontrada" />
                    <p>Você ainda não possui tarefas cadastradas!</p>
                </>
            }
        </div>
    )
}