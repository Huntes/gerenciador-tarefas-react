import React from 'react';
import moment from 'moment';
import naoConcluido from '../assets/icones/not-checked.svg';
import Concluido from '../assets/icones/checked.svg';

export const Item = props =>{

    const {tarefa} = props;
    const {dataConclusao, nome, dataPrevisaoConclusao} = tarefa;

    //Função que retorna HTML de data quando tarefa foi concluida ou quando ainda não foi concluída, dinamicamente
    const getDataTexto = (dtConclusao, dtPrevisaoConclusao) => {
        if(dtConclusao){
            return `Concluído em: ${moment(dataConclusao).format('DD/MM/yyyy')}`;
        }else{
            return `Previsão de conclusão em: ${moment(dataPrevisaoConclusao).format('DD/MM/yyyy')}`;
        }
    };

    return(
        <div className={"container-item " + (dataConclusao ? "" : "ativo")}>
            <img src={dataConclusao ? Concluido : naoConcluido} alt={dataConclusao ? "tarefa concluída" : "selecione a tarefa"}/>
            <div>
                <p className={dataConclusao? "concluido" : ""}>{nome}</p>
                <span>{getDataTexto(dataConclusao, dataPrevisaoConclusao)}</span>
            </div>
        </div>
    )
}