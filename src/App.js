import {Login} from './pages/Login';
import './styles/app.scss';

//Importar o componente Login da pasta Pages e chamar ele dentro do componente APP
//O componente APP é chamado dentro do index.JS que renderiza na página do navegador
function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
