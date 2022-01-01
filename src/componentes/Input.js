import React from 'react';

//Componente input, que receberá os dados criados na props
//para passar dinamicamente para o HTML
export const Input = props => {

    //Propriedades que receberão os dados dos componentes que importarem esse Input
    const {
        srcImg, 
        altImg, 
        inputType,
        inputName,
        inputPlaceholder,
        value,
        setValue,
    } = props;


    //Componente input retorna o HTML com os dados dinâmicos
    return (
        <div className='input'>
            <img src={srcImg} alt={altImg}/>
            <input type={inputType} name={inputName} placeholder={inputPlaceholder} value={value} onChange={evento => setValue(evento.target.value)}/>
        </div>
    )
}