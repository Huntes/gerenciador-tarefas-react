import {Switch, Route} from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import './styles/app.scss';
import { useState } from 'react';

//Importar o componente Login da pasta Pages e chamar ele dentro do componente APP
//O componente APP é chamado dentro do index.JS que renderiza na página do navegador
function App() {

  //Pega o accessToken da página logada e guarda no State
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  return (
    <Switch>
      {!accessToken ? 
        //Quando o accessToken for vazio, o usuário sempre vai cair no Login
        <Route path="*">
          <Login setAccessToken={setAccessToken} />
        </Route>
        :
        //Quando o accessToken já existir ele não passará mais pela página de login
        <Route path="*">
          <Home setAccessToken={setAccessToken} />
        </Route>
      }
    </Switch>
  );
}

export default App;
