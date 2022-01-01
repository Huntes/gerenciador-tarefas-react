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
    console.log(`executando: ${URL}${endpoint}, metodo: ${metodoHTTP}, body: ${body}`);

    return instance.request({
        url: endpoint,
        method: metodoHTTP,
        data: body? body : ''
    });
}