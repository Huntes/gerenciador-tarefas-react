import React, { useEffect, useState } from 'react'
import { Header } from '../componentes/Header';
import { Filtros } from '../componentes/Filtros';
import { Listagem } from '../componentes/Listagem';
import { Footer } from '../componentes/Footer';
import {executaRequisicao} from '../services/api';

export const Home = props => {

    //Simulação de tarefas recebidas da API, sendo passadas via Props para o componente lista de tarefas
    const [tarefas, setTarefas] = useState([]);
    const [periodoDe, setPeriodoDe] = useState('');
    const [periodoAte, setPeriodoAte] = useState('');
    const [status, setStatus] = useState(0);


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
            <Footer />
        </>
    );
}