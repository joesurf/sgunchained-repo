import { useState, useEffect } from 'react'

import Player from './musicplayer/Player';

function MusicPlayer() {
  const [songs, setSongs] = useState([
    {
      title: "We Come Alive",
      artist: "waykap",
      img_src: "/images/musicplayer/euphoric/euphoric.png",
      src: "/images/musicplayer/euphoric/ES_We Come Alive (Instrumental Version) - waykap.mp3"
    },
    {
      title: "At the End of Nothing",
      artist: "Silver Maple",
      img_src: "/images/musicplayer/sad/sad.png",
      src: "/images/musicplayer/sad/ES_At the End of Nothing - Silver Maple.mp3"
    },
    {
      title: "Sunset Boulevard",
      artist: "baegel",
      img_src: "/images/musicplayer/relaxing/relaxing.png",
      src: "/images/musicplayer/relaxing/ES_Sunset Boulevard - baegel.mp3"
    }
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    })
  }, [currentSongIndex])

  return (
    <div className="c-app">
      <Player 
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  )
}

export default MusicPlayer