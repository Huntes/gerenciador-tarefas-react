import React, { useState } from 'react';
import logo from '../assets/icones/devaria-logo.svg';
import mail from '../assets/icones/mail.svg';
import lock from '../assets/icones/lock.svg';
import {Input} from '../componentes/Input';

//Página de login, que será chamado dentro do componente App.JS para aparecer na tela
//Componente Funcional, declarado nominalmente, não pode ser outro nome na importação, obrigatoriamente como Login
export const Login = () => {

    //Hooks useState, variável que guardará dados para login
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setLoading] = useState(false);

    const executaLogin = evento => {
        evento.preventDefault();
        setLoading(true);
        console.log('login', login);
        console.log('senha', senha);

        setTimeout( () => {
            setLoading(false);
        }, 3000);
    }

    //Passa dinamicamente as propriedades (Props) e o componente Input retorna o HTML correto
    return (
        <div className='container-login'>
            <img className='logo' src={logo} alt="Logo Devaria"/>
            <form>
                <Input 
                    srcImg={mail}
                    altImg={"Icone email"}
                    inputType={"text"}
                    inputName={"login"}
                    inputPlaceholder={"Informe seu email"}
                    value={login}
                    setValue={setLogin}
                />

                <Input 
                    srcImg={lock}
                    altImg={"Icone senha"}
                    inputType={"password"}
                    inputName={"senha"}
                    inputPlaceholder={"Informe seu senha"}
                    value={senha}
                    setValue={setSenha}
                />

                <button onClick={executaLogin} disabled={isLoading}>{isLoading === true ? '...Carregando' : 'Entrar'}</button>

            </form>
        </div>
    );
}