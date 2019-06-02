import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import React, { Component } from 'react';
// import logo from './logo.svg';
import queryString from 'query-string'
import { Navbar } from '.';
import { createPlaylistThunk, getAllTrackIdThunk, updateMoodThunk } from '../store/playlist'
// class Mood extends Component {
//   render() {
//     return (
//       <div >
//         <button style={{width:'40%' }} onClick>Mood</button>
//       </div>
//     );
//   }
// }
class Spotify extends Component {
  constructor(){
    super()
    this.state = {user: {}, playlist: {}}
    this.populateDatabase = this.populateDatabase.bind(this)
    this.trackIds = this.trackIds.bind(this)
    // this.getAudioFeatures = this.getAudioFeatures.bind(this)
  }
  componentDidMount() {
    console.log('props from Spotify Component', this.props)
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
    
    //CHANGED  PLAYLIST ID TO  ONE  OF  CLARYS  PLAYLIST ***
  fetch('https://api.spotify.com/v1/playlists/5dpT7xLiK5WjI5RruHRMCT', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlist: {
        giantPlaylist: data.tracks.items
      }
    }))
  }

  populateDatabase() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    this.state.playlist.giantPlaylist.map(track => {
    this.props.postTracks({image: track.track.album.images[0].url, spotifyId: track.track.id})

    fetch(`https://api.spotify.com/v1/audio-features/${track.track.id}`, {
       headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.moodSetter(data, track.track.id))
      // .then(data => console.log('Features', track.track.id ,data.energy))
    })
  }

  moodSetter(featureData, spotifyId){
    if (featureData.energy >= 0.64){
      this.props.updateMood({mood: 'High Energy', spotifyId})
    }
  }

  trackIds(){
    this.props.getTrackIds();
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
      { this.state.user.name ?
      <div>
        <h1 style={{'fontSize': '50px', 'color': 'red'}}>
          {this.state.user.name} let's Feel2une !
        </h1>
        <button type='button' onClick={this.populateDatabase}>Populate Database / Get Audio Features</button>
        <button type='button' onClick={this.trackIds}>Get Track IDs</button>
        {/* <button type='button' onClick={this.getAudioFeatures}>Get Audio Features</button> */}
        <button type='button' onClick={this.happyHandler}>Happy</button>
      </div> : <button type='button' onClick={() => window.location ='http://localhost:8888/login'}
       style={{color: 'green', padding: '80px', 'fontSize': '50px', 'marginTop': '70px'}}>Sign in with Spotify</button>
      }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  allTrackIds: state.allTrackIds
})

const mapDispatchToProps = (dispatch) => {
  return {
      postTracks: (tracks) => dispatch(createPlaylistThunk(tracks)),
      getTrackIds: (trackIds) => dispatch(getAllTrackIdThunk(trackIds)),
      updateMood: (track) => dispatch(updateMoodThunk(track))
  }
}


// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '2102d6bf57714410a8f50dd1ccadc571';
const redirectUri = 'https://spotify-web-playback.glitch.me';
const scopes = [
  'streaming',
  'user-read-birthdate',
  'user-read-private',
  'user-modify-playback-state'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// Set up the Web Playback SDK

window.onSpotifyPlayerAPIReady = () => {
  const player = new Spotify.Player({
    name: 'Web Playback SDK Template',
    getOAuthToken: cb => { cb(_token); }
  });

  // Error handling
  player.on('initialization_error', e => console.error(e));
  player.on('authentication_error', e => console.error(e));
  player.on('account_error', e => console.error(e));
  player.on('playback_error', e => console.error(e));

  // Playback status updates
  player.on('player_state_changed', state => {
    console.log(state)
    $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
    $('#current-track-name').text(state.track_window.current_track.name);
  });

  // Ready
  player.on('ready', data => {
    console.log('Ready with Device ID', data.device_id);
    
    // Play a track using our new device ID
    play(data.device_id);
  });

  // Connect to the player!
  player.connect();
}

// Play a specified track on the Web Playback SDK's device ID
function play(device_id) {
  $.ajax({
   url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
   type: "PUT",
   data: '{"uris": ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"]}',
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(data) { 
     console.log(data)
   }
  });
}





export default connect(mapStateToProps, mapDispatchToProps)(Spotify)

