import React from 'react';
import Adicionar from '../assets/icones/adicionar.svg';

export const Footer = () => {
    return(
        <div className='container-footer'>
            <button><img src={Adicionar} alt="Adicionar tarefa"/> Adicionar tarefa </button>
            <span>© Copyright {new Date().getFullYear()} Devaria. Todos os direitos reservados.</span>
        </div>
    )
}