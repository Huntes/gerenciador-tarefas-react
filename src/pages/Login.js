import React, { useState } from 'react';
import logo from '../assets/icones/devaria-logo.svg';
import mail from '../assets/icones/mail.svg';
import lock from '../assets/icones/lock.svg';
import {Input} from '../componentes/Input';
import { executaRequisicao } from '../services/api';

//Página de login, que será chamado dentro do componente App.JS para aparecer na tela
//Componente Funcional, declarado nominalmente, não pode ser outro nome na importação, obrigatoriamente como Login
export const Login = props => {

    //Hooks useState, variável que guardará dados para login
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [msgErro, setMsgErro] = useState();
    const [isLoading, setLoading] = useState(false);

    const executaLogin = async evento => {
        try{
            evento.preventDefault();
            setLoading(true);
            setMsgErro('');

            const body = {
                login,
                senha
            };

            //Variável que guarda o resultado da requisição da API, chama a API com endpoint Login, do tipo POST com um body 
            const resultado =  await executaRequisicao('login', 'POST', body);
            if(resultado?.data?.token){
                localStorage.setItem('accessToken', resultado.data.token);
                localStorage.setItem('usuarioNome', resultado.data.nome);
                localStorage.setItem('usuarioEmail', resultado.data.email);
                props.setAccessToken(resultado.data.token);
            }

            setTimeout( () => {
            }, 3000);

        }
        catch(e){
            console.log(e);
            //Operador ? verifica se existe o elemento a cada ? 
            if(e?.response?.data?.erro){
                //Retorna a mensagem de erro via useState 
                setMsgErro(e.response.data.erro);
            }else{
                //Caso a API não retorne nada ou não esteja funcionando, retorna uma mensagem de erro genérica
                setMsgErro('Não foi possível efetuar o login, contate o administrador.');
            }
        }

        setLoading(false);
    }

    //Passa dinamicamente as propriedades (Props) e o componente Input retorna o HTML correto
    return (
        <div className='container-login'>
            <img className='logo' src={logo} alt="Logo Devaria"/>
            <form>
                {msgErro && <p>{msgErro}</p>}
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