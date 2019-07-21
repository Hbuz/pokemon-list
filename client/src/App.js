import React from "react";
import store from "./store";
import { Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import PokemonContainer from "./components/pokemon/PokemonContainer";
import LoginFormContainer from "./components/login/LoginFormContainer";
import SignupFormContainer from "./components/signup/SignupFormContainer";


class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route exact path="/login" component={LoginFormContainer} />
          <Route exact path="/signup" component={SignupFormContainer} />
          <Route exact path="/pokemons" component={PokemonContainer} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
        </div>
      </Provider>
    );
  }
}

export default App;
