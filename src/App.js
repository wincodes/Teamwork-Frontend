import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import { setCurrentUser, logoutUser } from './actions/authActions'
import jwt_decode from 'jwt-decode'

import Header from './components/layouts/Header';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';
import Login from './components/Login';
import Register from './components/Register'
import CreateGif from './components/CreateGif';
import ViewGif from './components/ViewGif';
import CreateArticle from './components/CreateArticle';
import ViewArticle from './components/ViewArticle';

if (localStorage.jwtToken) {
  //decode the jwt token
  const decoded = jwt_decode(localStorage.jwtToken)

  //set current user
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser())

    //redirect to login
    window.location.href = '/login';
  }
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className='router-component'>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/create-gif" component={CreateGif} />
            <Route exact path="/gifs/:gifId" component={ViewGif} />
            <Route exact path="/create-article" component={CreateArticle} />
            <Route exact path="/articles/:articleId" component={ViewArticle} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
