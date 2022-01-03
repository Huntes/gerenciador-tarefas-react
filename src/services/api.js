import axios from 'axios';

//URL PADRÃO
const URL = process.env.REACT_APP_API_URL+'/api/';

//Instancia do axios configurada com a URL padrão e um timeout de 3 segundos
const instance = axios.create({
    baseURL : URL,
    timeout: 30000
});

//Método que é executado quando houver uma requisição, passando a URL e os dados para a API
export const executaRequisicao = (endpoint, metodoHTTP, body) => {

    //Pega o accessToken guardado no localStorage 
    const accessToken = localStorage.getItem('accessToken');

    let headers = {'Content-Type' : 'application/json'};

    //Caso o accessToken exista, adiciona um Authorization no header com o token, para liberação de requisição do usuário
    if(accessToken){
        headers['Authorization'] = 'Bearer ' + accessToken;
    }

    console.log(`executando: ${URL}${endpoint}, metodo: ${metodoHTTP}, body: ${body}, headers ${headers}`);

    return instance.request({
        url: endpoint,
        method: metodoHTTP,
        data: body? body : '',
        headers: headers
    });
}