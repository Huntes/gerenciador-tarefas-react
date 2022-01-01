import React from 'react'
import { Header } from '../componentes/Header';

export const Home = props => {

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
        </>
    );
}