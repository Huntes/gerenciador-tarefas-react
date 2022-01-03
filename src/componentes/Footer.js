import React from 'react';
import Adicionar from '../assets/icones/adicionar.svg';

export const Footer = props => {

    //Prop showModal sendo passada ao footer, function declarada na home para abrir/fechar modal a cada click
    const {showModal} = props;

    return(
        <div className='container-footer'>
            <button onClick={showModal}><img src={Adicionar} alt="Adicionar tarefa"/> Adicionar tarefa </button>
            <span>© Copyright {new Date().getFullYear()} Devaria. Todos os direitos reservados.</span>
        </div>
    )
}