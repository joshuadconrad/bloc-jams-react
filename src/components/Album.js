import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';



class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      hoveredSong: null,
      volume: "0.5"
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
    timeupdate: e => {
      this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({ duration: this.audioElement.duration });
    },
    volumechange: e => {
      this.setState({ volume: this.audioElement.volume })
    }
  };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song })
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  setHover(song) {
    this.setState({ hoveredSong: song });
  }

  unsetHover(song) {
    this.setState({ hoveredSong: null });
  }

  showTrackOrButton(song, index) {
    if(this.state.isPlaying && this.state.currentSong === song){
      return (
        <span className="icon ion-ios-pause"></span>
      );
    }
    if(!this.state.isPlaying && this.state.currentSong === song){
      return (
        <span className="icon ion-ios-play"></span>
      );
    }
    if(this.state.hoveredSong === song){
      return(
        <span className="icon ion-ios-play"></span>
      );
    } else{
        if(song){
          return <span>{index+1}</span>;
        }
      }
  }

  handlePrevClick(){
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
  }

  handleNextClick(){
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(4, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
  }

  handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
  }

  formatTime(t) {
    const hours = (Math.floor(t / 3600));
    const minutes = (Math.floor(t / 60));
    const seconds = (Math.floor(t % 60));

    if(seconds < 10){
      return (minutes + ":0" + seconds);
    }
    if (t){
      if(minutes > 60){
        return (hours + ":" + minutes + ":" + seconds);
      } else{
          return (minutes + ":" + seconds)
      }
    } else{
        return "-:--";
    }
 }

 handleVolumeChange(e) {
   const newVolume =  e.target.value;
   this.audioElement.volume = newVolume;
   this.setState({ volume: newVolume });
 }

 render() {
   return (
     <section className="album">
     <section className="album-info" id="album-info">
       <div className="container">
         <div className="row">
           <div className="col-sm-5 offset-lg-2 col-lg-3">
             <img className="img-responsive album-cover" id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
           </div>
           <div className="col-sm-7 col-lg-5">
             <div className="album-details">
               <span className="type">Album</span>
               <h1 className="album-title" id="album-title">{this.state.album.title}</h1>
               <h2 className="artist"><span className="by-artist">by</span> {this.state.album.artist}</h2>
               <div className="release-info" id="release-info">{this.state.album.releaseInfo}</div>
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="player">
      <table className="song-list" id="songs-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>
        <tbody>
          {
            this.state.album.songs.map(( song, index) =>
              <tr className="song" key={index} onClick={ () => this.handleSongClick(song) } onMouseEnter= { () => this.setHover(song) } onMouseLeave={ () => this.unsetHover(song) }>
                <td className="index">{this.showTrackOrButton(song, index)}</td>
                <td className="title">{song.title}</td>
                <td className="time">{this.formatTime(song.duration)}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      </section>
      <section className="player-controls">
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(e) => this.formatTime(e)}
          />
        </section>
    </section>

    );
  }
}

export default Album;
