import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Landing.css';


const Landing = () => (
  <section className="Landing">
    <section className="hero">
    <div className="overlay"></div>
    <img src="/assets/images/jan-strecha-722892-unsplash.jpg" alt="Man listening to music." className="img-responsive"/>
      <div className="container hero-container">
        <div className="row">
          <div className="col-md-5 offset-md-1 hidden-mobile">
            <div className="hero-title-wrapper">
              <h1 className="hero-title">Turn the<br></br>music up!</h1>
              <button className="btn-primary"><Link to="/library">Try it Now</Link></button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="selling-points">
      <div className="container">
        <div className="row">
          <div className="col-12 hidden-desktop m-hero-title-wrapper">
            <h1 className="hero-title">Turn the music up!</h1>
              <button className="btn-primary"><Link to="/library">Try it Now</Link></button>
          </div>
          <div className="col-12 col-lg-4">
            <div className="point">
              <h2 className="point-title">Choose your music</h2>
              <i className="icon ion-ios-musical-notes"></i>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
          </div>
          <div className=" col-12 col-lg-4">
            <div className="point">
              <h2 className="point-title">Unlimited streaming</h2>
              <i className="icon ion-ios-cloud-outline"></i>
              <h3 className="point-title">Ad free</h3>
              <p className="point-description">No arbitrary limits. No distractions.</p>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="point">
              <h2 className="point-title">Designed for Mobile</h2>
              <i className="icon ion-ios-phone-portrait"></i>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
          </div>
          <div className="col-6 offset-3 padding-top-30">
          <button className="btn-primary btn-full"><Link to="/library">Try it Today</Link></button>
          </div>
        </div>
      </div>
    </section>
    <section className="footer">
      <p className="footer-text">Bloc Jams</p>
      <p className="footer-text">A Bloc.io Project</p>
    </section>
  </section>
);

export default Landing;
