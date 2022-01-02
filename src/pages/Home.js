import React, { useState } from 'react'
import { Header } from '../componentes/Header';
import { Filtros } from '../componentes/Filtros';
import { Listagem } from '../componentes/Listagem';
import { Footer } from '../componentes/Footer';

export const Home = props => {

    //Simulação de tarefas recebidas da API, sendo passadas via Props para o componente lista de tarefas
    const [tarefas, setTarefas] = useState([
        {
            id: '123fafa',
            nome: 'Tarefa Mock 1',
            dataPrevisaoConclusao: '2021-07-03',
            dataConclusao: null
        },

        {
            id: 'samnu456',
            nome: 'Tarefa Mock 2',
            dataPrevisaoConclusao: '2021-07-06',
            dataConclusao: '2021-06-30'
        }
    ]);

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
            <Filtros />    
            <Listagem tarefas={tarefas}/>
            <Footer />
        </>
    );
}