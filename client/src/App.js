import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
// import CreateDog from "./components/Card";
import { CreateDog } from './components/DogCreated';

function App() {
  return (
    
    <div className='App'>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
          <Route path="/Home" component={Home}/>
          <Route path="/dogs" component={CreateDog}/>
          <Route path="/detail/:id" component={Detail}/>
        </Switch>
    </BrowserRouter>
          </div>
  );
}

export default App;
