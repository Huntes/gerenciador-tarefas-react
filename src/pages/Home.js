import React from 'react'

export const Home = props => {
    return(
        <>
        <h1> Gerenciador de tarefas - Home </h1> 
        <a onClick={e => {
            //Ao clicar em sair, limpa os dados de token do navegador para voltar a página de login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('usuarioNome');
            localStorage.removeItem('usuarioEmail');
            //Limpa o token no State ao sair, a partir do setAccessToken
            props.setAccessToken('');
        }}>Sair</a>
        </>
    );
}