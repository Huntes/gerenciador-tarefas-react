import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Header } from '../componentes/Header';
import { Filtros } from '../componentes/Filtros';
import { Listagem } from '../componentes/Listagem';
import { Footer } from '../componentes/Footer';
import {executaRequisicao} from '../services/api';

export const Home = props => {

    //States da listagem de tarefas
    const [tarefas, setTarefas] = useState([]);

    //State dos filtros
    const [periodoDe, setPeriodoDe] = useState('');
    const [periodoAte, setPeriodoAte] = useState('');
    const [status, setStatus] = useState(0);
    
    //State de exibição do modal
    const [showModal, setShowModal] = useState(false);
    
    //States do cadastro
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [dataPrevisaoTarefa, setDataPrevisaoTarefa] = useState('');
    const [erro, setErro] = useState('');

    //Inverte o modal de false -> true / true -> false
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const getTarefasComFiltro = async () =>{
        try{

            //Variável filtros que será indexada na requisição GET tarefas, passando as opções selecionadas do front
            let filtros = '?status='+status;

            if(periodoDe){
                filtros += '&periodoDe='+periodoDe;
            }

            if(periodoAte){
                filtros += '&periodoAte='+periodoAte;
            }

            const resultado =  await executaRequisicao('tarefa'+filtros, 'get');
            if(resultado && resultado.data){
                setTarefas(resultado.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    const salvarTarefa = async () =>{
        try{
            if(!nomeTarefa || !dataPrevisaoTarefa){
                setErro('Favor informar nome e data de previsão');
                return;
            }

            //Corpo com variáveis requisitadas por API para criar a tarefa
            const body = {
                nome: nomeTarefa,
                dataPrevistaConclusao: dataPrevisaoTarefa
            }

            //Cria a tarefa enviando no body o nome e a data de conclusão
            await executaRequisicao('tarefa', 'post', body);
            await getTarefasComFiltro();

            //Limpa campos após criar a tarefa e fecha o modal
            setNomeTarefa('');
            setDataPrevisaoTarefa('');
            toggleModal();
        }catch(e){
            console.log(e);
            //Operador ? verifica se existe o elemento a cada ? 
            if(e?.response?.data?.erro){
                //Retorna a mensagem de erro via useState 
                setErro(e.response.data.erro);
            }else{
                //Caso a API não retorne nada ou não esteja funcionando, retorna uma mensagem de erro genérica
                setErro('Não foi possível cadastrar a tarefa, contate o administrador');
            }
        }
    }

    //UseEffect que chamará função para requisitar as tarefas na API, será executado toda vez que houver alterações nos States status, periodoDe e periodoAte, colocados na config []
    useEffect(() => {
        getTarefasComFiltro()
    }, [status, periodoDe, periodoAte]);

    const sair = () => {
        //Ao clicar em sair, limpa os dados de token do navegador para voltar a página de login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('usuarioNome');
        localStorage.removeItem('usuarioEmail');
        //Limpa o token no State ao sair, a partir do setAccessToken
        props.setAccessToken('');
    }

    return(
        <>
            <Header sair={sair} showModal={() => setShowModal(true)}/>
            <Filtros periodoDe={periodoDe} periodoAte={periodoAte} status={status} setPeriodoDe={setPeriodoDe} setPeriodoAte={setPeriodoAte} setStatus={setStatus}/>    
            <Listagem tarefas={tarefas} getTarefasComFiltro={getTarefasComFiltro}/>
            <Footer showModal={() => setShowModal(true)}/>
            <Modal show={showModal} onHide={toggleModal} className="container-modal">
                <Modal.Body>
                    <p>Adicionar uma tarefa</p>
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
                </Modal.Body>
                <Modal.Footer>
                    <div className='buttons col-12'>
                        <button onClick={salvarTarefa}>Salvar</button>
                        <span onClick={() => {
                            setErro('');
                            setNomeTarefa('');  
                            setDataPrevisaoTarefa('');                          
                            toggleModal();
                        }}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}