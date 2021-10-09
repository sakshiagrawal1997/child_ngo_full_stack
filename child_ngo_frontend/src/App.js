import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import State from './components/StateComponent';
import District from './components/DistrictComponent';
import Child from './components/ChildTable';
import AddChild from './components/AddChild';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (

    <div className="App">
    <Router>
   
   
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        
        <Route path="/home">
        <Header />
        <Home />
        </Route>
        <Route path="/state">
        <Header />
        <State />
        </Route>
        <Route path="/district">
        <Header />
        <District />
        </Route>
        <Route path="/child">
        <Header />
        <Child />
        </Route>
        <Route path="/addchild">
        <Header />
        <AddChild />
        </Route>
        <Route path="/">
        <Login />
        </Route>

      </Switch>
      
  </Router>
    
  </div>
        
        
        
    
  );
}

export default App;
