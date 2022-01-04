import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import ListaVazia from '../assets/icones/lista-vazia.svg'
import {Item} from './Item';
import { executaRequisicao } from '../services/api';

export const Listagem = props => {

    //Recebe via props o objeto de tarefas e função para getTarefas
    const { tarefas, getTarefasComFiltro } = props;

    //States para alterar a tarefa
    const [idTarefa, setIdTarefa] = useState(null);
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [dataPrevisaoTarefa, setDataPrevisaoTarefa] = useState('');
    const [dataConclusao, setDataConclusao] = useState('');

    //State para erro
    const [erro, setErro] = useState('');

    //State para abrir/fechar modal
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    //Função que selecionará a tarefa para abrir modal de edição
    const selecionarTarefa = tarefa => {
        setErro('');
        setIdTarefa(tarefa.id);
        setNomeTarefa(tarefa.nome);
        setDataPrevisaoTarefa(moment(tarefa.dataPrevistaConclusao).format('yyyy-MM-DD'));
        setDataConclusao(tarefa.dataConclusao);
        setShowModal(true);
    }

    //Função para atualizar a tarefa
    const atualizarTarefa = async () =>{
        try{
            if(!nomeTarefa || !dataPrevisaoTarefa){
                setErro('Favor informar nome e data de previsão');
                return;
            }

            //Corpo com variáveis requisitadas por API para atualizar a tarefa
            const body = {
                nome: nomeTarefa,
                dataPrevistaConclusao: dataPrevisaoTarefa,
                dataConclusao: dataConclusao
            }

            //Atualiza a tarefa enviando no body o nome, a data prevista de conclusão e a data de conclusão
            await executaRequisicao('tarefa/'+idTarefa, 'put', body);
            await getTarefasComFiltro();

            //Limpa campos após atualizar a tarefa e fecha o modal
            setNomeTarefa('');
            setDataPrevisaoTarefa('');
            setDataConclusao('');
            setIdTarefa(null);
            toggleModal();
        }catch(e){
            console.log(e);
            //Operador ? verifica se existe o elemento a cada ? 
            if(e?.response?.data?.erro){
                //Retorna a mensagem de erro via useState 
                setErro(e.response.data.erro);
            }else{
                //Caso a API não retorne nada ou não esteja funcionando, retorna uma mensagem de erro genérica
                setErro('Não foi possível atualizar a tarefa, contate o administrador');
            }
        }
    }

    //Função para excluir tarefa
    const excluirTarefa = async () =>{
        try{
            if(!idTarefa){
                setErro('Favor informar a tarefa a ser excluída');
                return;
            }

            await executaRequisicao('tarefa/'+idTarefa, 'delete');
            await getTarefasComFiltro();
            setNomeTarefa('');
            setDataPrevisaoTarefa('');
            setDataConclusao('');
            setIdTarefa(null);
            setShowModal(false);
        }catch(e){
            console.log(e);
            if(e?.response?.data?.erro){
                setErro(e.response.data.erro);
            }else{
                setErro('Não foi possível excluir a tarefa, contate o administrador');
            }
        }
    }

    //Adiciona a classe container e verifica se existem tarefas, caso não exista adiciona classe vazia também para estilização no CSS e alinhamento de itens
    return (
        <>
            <div className={"container-listagem " + (tarefas && tarefas.length > 0 ? "" : "vazia")}>

                {tarefas && tarefas.length > 0 ?

                    tarefas?.map(item => <Item tarefa={item} key={item.id} selecionarTarefa={selecionarTarefa}/>)
                    :
                    <>
                        <img src={ListaVazia} alt="Nenhuma atividade encontrada" />
                        <p>Você ainda não possui tarefas cadastradas!</p>
                    </>
                }
            </div>
            <Modal show={showModal} onHide={toggleModal} className="container-modal">
                <Modal.Body>
                    <p>Alterar uma tarefa</p>
                    {erro && <p className="error">{erro}</p>}
                    <input type="text" name="nome" 
                        placeholder='Nome da tarefa' 
                        value={nomeTarefa} 
                        onChange={evento => setNomeTarefa(evento.target.value)} 
                        className="col-12"/>

                    <input type="text" name="dataPrevisao" 
                        placeholder='Data de previsão de conclusão' 
                        value={dataPrevisaoTarefa} 
                        onChange={evento => setDataPrevisaoTarefa(evento.target.value)}
                        onFocus={evento => evento.target.type = 'date'} 
                        onBlur={evento => dataPrevisaoTarefa ? evento.target.type = 'date' : evento.target.type = 'text'} 
                        className="col-12"/>
                    <input type="text" name="dataConclusao" 
                        placeholder='Data de conclusão' 
                        value={dataConclusao} 
                        onChange={evento => setDataConclusao(evento.target.value)}
                        onFocus={evento => evento.target.type = 'date'} 
                        onBlur={evento => dataConclusao ? evento.target.type = 'date' : evento.target.type = 'text'} 
                        className="col-12"/>
                </Modal.Body>
                <Modal.Footer>
                    <div className='buttons col-12'>
                        <button onClick={atualizarTarefa}>Alterar</button>
                        <span onClick={excluirTarefa}>Excluir tarefa</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}