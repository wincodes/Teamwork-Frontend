import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className='router-component'>
          <Route exact path="/" component={Landing} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
