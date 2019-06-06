import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createPlaylistThunk, getAllTrackIdThunk, updateMoodThunk, selectedEnergyTrackThunk, selectedHappyTrackThunk,
    selectedDanceTrackThunk, selectedSadTrackThunk } from '../store/playlist'

class TrackView extends Component {
    constructor(){
        super()
        // this.state = {user: {}, playlist: {}}
        // this.populateDatabase = this.populateDatabase.bind(this)
        this.energyHandler = this.energyHandler.bind(this)
        this.danceHandler  = this.danceHandler.bind(this)
        this.happyHandler = this.happyHandler.bind(this)
        this.sadHandler = this.sadHandler.bind(this)
        // this.moreTunesToDataBaseManual = this.moreTunesToDataBaseManual.bind(this)
        // // this.trackIds = this.trackIds.bind(this)
        // // this.getAudioFeatures = this.getAudioFeatures.bind(this)
      }

      componentDidMount(){
          console.log('did TrackView')
      }

      energyHandler() {
        this.props.selectedEnergyTrack()
      }
    
      danceHandler() {
        this.props.selectedDanceTrack()
      }
    
      happyHandler() {
        this.props.selectedHappyTrack()
      }
    
      sadHandler() {
        this.props.selectedSadTrack()
      }

    render() {
        return (
            <div >
              { this.props.playlist.selectedTrack ?
              // <div className='body'>
              // <h1 style={{'fontSize': '45px', 'color': 'red'}} className='title'>
              //   Hey {this.props.userName.toUpperCase()} let's Feel2une !
              // </h1>
              // <div style={{"marginTop":"60px"}}></div>
              // <div style={{"padding":"20px"}} className="columns">
              //   {/* <button type='button' onClick={this.populateDatabase}>Populate Database / Get Audio Features</button> */}
              //   {/* <button type='button' onClick={this.moreTunesToDataBaseManual}>Get Track from Playlist</button> */}
                
              //   {/* <button type='button' onClick={this.trackIds}>Get Track IDs</button> */}
              //   {/* <button type='button' onClick={this.getAudioFeatures}>Get Audio Features</button> */}
              //   <button style={{'color': 'red'}} className="column button is-danger is-large is-outlined is-rounded" type='button' onClick={this.energyHandler}>High Energy</button>
              //   <button style={{'color': 'yellow'}} className="column button is-warning is-large is-outlined is-rounded" type='button' onClick={this.happyHandler}>Happy</button>
              //   <button style={{'color': 'blue'}} className="column button is-info is-large is-outlined is-rounded" type='button' onClick={this.danceHandler}>Dance-y</button>
              //   <button style={{'color': 'green'}} className="column button is-success is-large is-outlined is-rounded" type='button' onClick={this.sadHandler}>Sad</button>
              <div className='trackInfo'>
                  <img width='350px' height="250px" src={this.props.playlist.selectedTrack.image} ></img>
                  <div style={{'fontSize': '40px', 'color': 'white'}} className='trackInfo'>
                Song: {this.props.playlist.selectedTrack.songTitle} 
                <br/>
                Artist: {this.props.playlist.selectedTrack.artistName} 
                <br/>
                Album: {this.props.playlist.selectedTrack.albumName} 
                </div>
              </div>
              :
              <div className='logo'>
                  <img className='logo' src='https://i.ibb.co/JRYp3WZ/Screen-Shot-2019-06-05-at-1-44-03-PM.png' ></img>
              </div>
              }
            </div>
        //     </div>
        //   </div>
        )
    }
}

// const mapStateToProps = state => ({
//     selectedTrack: state.playlist.selectedTrack
//   })

const mapDispatchToProps = (dispatch) => {
    return {
        // postTracks: (tracks) => dispatch(createPlaylistThunk(tracks)),
        // getTrackIds: (trackIds) => dispatch(getAllTrackIdThunk(trackIds)),
        // updateMood: (track) => dispatch(updateMoodThunk(track)),
        selectedEnergyTrack: (track) => dispatch(selectedEnergyTrackThunk(track)),
        selectedHappyTrack: (track) => dispatch(selectedHappyTrackThunk(track)),
        selectedSadTrack: (track) => dispatch(selectedSadTrackThunk(track)),
        selectedDanceTrack: (track) => dispatch(selectedDanceTrackThunk(track))
    
    }
  }

export default connect(null, mapDispatchToProps)(TrackView)
