import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import facade from "./apifacade";
import style2 from "./style2.css";
import Walker, { WalkerList } from "./walkers";
import WalkerSorteder from "./walksort";
import Dog, { DogList } from "./dogs";
import { CreateDog } from "./createDog";


function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData().then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>

    </div>

  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (

    <div>
      {loggedIn ? (
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/walkerslist">
              <WalkersList />
            </Route>
            <Route path="/dogList">
              <DogsList />
            </Route>
            <Route path="/walksorted">
              <WalkSorted />
            </Route>
            <Route path="/creation">
              <Creation />
              <CreateDog />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LogIn login={login} />
      )
      }
    </div >
  );
}



class NoMatch extends React.Component {
  render() {
    return <h1>ERROR ERROR ERROR ERROR, THIS ISN'T REAL</h1>;
  }
}


class WalkersList extends React.Component {
  render() {
    return (
      <div>
        <Walker />
        <WalkerList />
      </div>
    )
  }
}

class WalkSorted extends React.Component {
  render() {
    return (
      <div>
        <input id="theDog"></input>
        <br />
        <button onClick={WalkerSorteder}>Klik her for at se dem der går tur med den intastede hund.</button>
      </div>
    )
  }
}

class DogsList extends React.Component {
  render() {
    return (
      <div>
        <Dog />
        <DogList />
      </div>
    )
  }
}

class Creation extends React.Component {
  render() {
    return (
      <div>
        <h5>I am here to test connection</h5>
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Velkommen til Dog-Walker system 1.5</h1>
        <h2>Click ovenfor dette tekst for at navigere rundt på siden</h2>
      </div>
    )
  }
}

function Header() {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/walkerslist">
            WalkersList
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/dogList">
            DogList
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/walksorted">
            Walkers Sorted
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/creation">
            Dog Creation
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default App;
