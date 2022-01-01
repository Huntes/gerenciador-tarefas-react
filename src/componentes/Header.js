import React from 'react';
import logo from '../assets/icones/devaria-logo.svg';
import sair from '../assets/icones/exit.svg';
import sairDesktop from '../assets/icones/exit-desktop.svg';

//Componente de Header da página, que será compartilhado para todas as outras telas
export const Header = props =>{

    //Pega nome completo do usuário armazenado no Application do navegador do usuário
    const nomeCompleto = localStorage.getItem('usuarioNome');
    //Verificar se o nome completo existe, separa em um vetor separando por espaço e pega o primeiro nome
    const primeiroNome = nomeCompleto?.split(' ')[0] || '';

    return(
        <div className='container-header'>
            <img className='logo' src={logo} alt="Logo Devaria"/>
            <button><span>+</span> Adicionar tarefa </button>
            <div className='mobile'>
                <span>Olá, {primeiroNome}</span>
                <img className='sair' src={sair} alt="Deslogar" onClick={props.sair}/>
            </div>
            <div className='desktop'>
                <span>Olá, {primeiroNome}</span>
                <img className='sair' src={sairDesktop} alt="Deslogar" onClick={props.sair}/>
            </div>
        </div>
    )
}