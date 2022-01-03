import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Header } from '../componentes/Header';
import { Filtros } from '../componentes/Filtros';
import { Listagem } from '../componentes/Listagem';
import { Footer } from '../componentes/Footer';
import {executaRequisicao} from '../services/api';

export const Home = props => {

    //States da página Home, filtros da tarefa + modalState
    const [tarefas, setTarefas] = useState([]);
    const [periodoDe, setPeriodoDe] = useState('');
    const [periodoAte, setPeriodoAte] = useState('');
    const [status, setStatus] = useState(0);
    const [showModal, setShowModal] = useState(false);

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
            <Header sair={sair}/>
            <Filtros periodoDe={periodoDe} periodoAte={periodoAte} status={status} setPeriodoDe={setPeriodoDe} setPeriodoAte={setPeriodoAte} setStatus={setStatus}/>    
            <Listagem tarefas={tarefas}/>
            <Footer showModal={() => setShowModal(true)}/>
            <Modal show={showModal} onHide={toggleModal} className="container-modal">
                <Modal.Body>
                    <p>Adicionar uma tarefa</p>
                    <input type="text" name="nome" placeholder='Nome da tarefa' className="col-12"/>
                    <input type="text" name="dataPrevisao" placeholder='Data de conclusão' className="col-12"/>
                </Modal.Body>
                <Modal.Footer>
                    <div className='buttons col-12'>
                        <button>Salvar</button>
                        <span onClick={toggleModal}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}