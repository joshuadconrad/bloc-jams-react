import React, { Component } from 'react';
import albumData from './../data/albums';
import { Route, Link } from 'react-router-dom';
import './Library.css';


class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData }
  }

  render() {
    return (
      <section className="library">
        <section className="section">
        <div className="container">
          <div className="row">
              {
                this.state.albums.map( (album, index) =>
                <div className="col-6 col-md-3 albums">
                  <Link to={`/album/${album.slug}`} key={index}>
                    <img src={album.albumCover} alt={album.title} className="img-responsive" />
                    <div className="title">{album.title}</div>
                    <div className="artist">{album.artist}</div>
                    <div className="songs">{album.songs.length} songs</div>
                  </Link>
                  </div>
                )
              }
          </div>
        </div>
        </section>
        <section className="footer">
          <p className="footer-text">Bloc Jams</p>
          <p className="footer-text">A Bloc.io Project</p>
        </section>
      </section>
    );
  }
}

export default Library;
