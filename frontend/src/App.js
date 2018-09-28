import React, {Component} from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import mainApp from "./components/mainApp";
import Article from "./components/Article";
import LoginRegister from "./components/LoginRegister";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import mainReducers from "./reducers/index";
import thunk from "redux-thunk";

let store = createStore(mainReducers, applyMiddleware(thunk));

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={mainApp}/>
                        <Route exact path="/profile/:username" component={Profile}/>
                        <Route exact path="/article/:articleId" component={Article}/>
                        <Route exact path="/login" component={LoginRegister}/>
                        <Route exact path="/register" component={Register}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}



export default App;
