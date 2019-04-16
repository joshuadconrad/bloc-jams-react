import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import './bootstrap-grid.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="jam-head">
          <nav className="jam-nav">
            <Link to="/"><img src="/assets/images/bloc_jams_logo.png" alt="Bloc Jams" className="logo" /></Link>
            <div className="nav-links">
            <Link to={`/library`}>Library</Link>
            <a href="https://www.bloc.io/users/joshuad-conrad" target="_blank">About</a>
            </div>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
