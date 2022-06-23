import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';

import './player.css'


function Player({ currentSongIndex, setCurrentSongIndex, nextSongIndex, songs }) {

  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play()
    } else {
      audioEl.current.pause()
    }
  })

  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp ++;

        if (temp > songs.length - 1) {
          temp = 0
        }

        return temp;
      })
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp --;

        if (temp < 0) {
          temp = songs.length - 1;
        }

        return temp;
      })
    }
  }

  return (
    <div className="c-player">
      <audio src={songs[currentSongIndex].src} ref={audioEl}></audio>
      <h4>Playing now</h4>
      <PlayerDetails song={songs[currentSongIndex]} />
      <PlayerControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
      <p><strong>Next up:</strong> {songs[nextSongIndex].title} by {songs[nextSongIndex].artist} </p>
    </div>
  )
}

export default Player