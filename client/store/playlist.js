import axios from 'axios'

const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
const GET_ALL_TRACK_IDS = 'GET_ALL_TRACK_IDS';
const UPDATE_MOOD = 'UPDATE_MOOD';

const createPlaylist = (tracks) => ({
    type: CREATE_PLAYLIST,
    tracks
});

const getAllTrackId = (trackIds) => ({
    type: GET_ALL_TRACK_IDS,
    trackIds
});

const updateMood = (features) => ({
  type: UPDATE_MOOD,
  features
});

export const createPlaylistThunk = obj => async dispatch => {
    try {
      const {data} = await axios.post('/api/playlist', obj)
      dispatch(createPlaylist(data))
    } catch (err) {
      console.log(err)
    }
  }

  export const getAllTrackIdThunk = () => async dispatch => {
    try {
      const {data} = await axios.get('/api/playlist')
      console.log('DATA *******', data)
      dispatch(getAllTrackId(data))
    } catch (err) {
      console.log(err)
    }
  }

  export const updateMoodThunk = (features) => async dispatch => {
    try {
      const {data} = await axios.put(`/api/playlist`, features)
      console.log('Update Mood DATA *******', data)
      dispatch(updateMood(data))
    } catch (err) {
      console.log(err)
    }
  }

  const initialState = {
    allTracks: [],
    allTrackIds: []
}

export default function(state = initialState, action){
    const newState = {...state}
    switch (action.type){
        case CREATE_PLAYLIST:
            newState.allTracks = [...newState.allTracks, action.tracks]
            return newState
        case GET_ALL_TRACK_IDS:
            newState.allTrackIds = [...newState.allTrackIds, action.trackIds]
            return newState
        default:
            return state
    } 
}