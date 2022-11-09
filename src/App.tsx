import { useRef, useState } from 'react'
import './App.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRepeat, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { 
  decrementMinutes, 
  startStop, 
  reset, 
  incrementBreak,
  decrementBreak, 
  incrementSession, 
  decrementSession, 
  decrementSeconds
} from './services/store'

interface StateProps {
  timer: {
        minutes: string,
        seconds: string,
        breakNum: number,
        session: number,
        isCounting: boolean,
        state: string
  }
}

function App() {

  const { isCounting, session, breakNum } = useSelector((state: StateProps) => state.timer)
  const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <h2>25 + 5 clock</h2>
      <section>
        <div>
          <p id='break-label'>Break Length</p>
          <div className='wrapper__upper-section'>
            <button id='break-decrement'>
              <FontAwesomeIcon icon={faArrowDown} onClick={() => dispatch(decrementBreak())}/>
            </button>
            <span id='break-length'>{breakNum}</span>
            <button id='break-increment'>
              <FontAwesomeIcon icon={faArrowUp} onClick={() => dispatch(incrementBreak())}/>
            </button>
          </div>
        </div>
        <div>
          <p id='session-label'>Session Length</p>
          <div className='wrapper__upper-section'>
            <button id='session-decrement'>
              <FontAwesomeIcon icon={faArrowDown} onClick={() => dispatch(decrementSession())}/>
            </button>
            <span id='session-length'>{session}</span>
            <button id='session-increment'>
              <FontAwesomeIcon icon={faArrowUp} onClick={() => dispatch(incrementSession())}/>
            </button>
          </div>
        </div>
      </section>
      <Timer />
      <section>
        <button id='start_stop' onClick={() => dispatch(startStop())}>
          <FontAwesomeIcon icon={faPlay}/>
          <FontAwesomeIcon icon={faPause}/>
        </button>
        <button id='reset' onClick={() => dispatch(reset())}>
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </section>
    </div>
  )
}

const Timer = () => {

  const { state, minutes, seconds, isCounting } = useSelector((state: StateProps) => state.timer)
  const dispatch = useDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)

  if (isCounting) setTimeout(() => dispatch(decrementSeconds()), 500)
  
  const playSound = () => {
    audioRef.current!.loop = true
    audioRef.current!.play()
    setTimeout(() => audioRef.current!.pause(), 3000)
  }

  if (seconds === '00' && minutes === '00') {
    playSound()
  }

  return (
  <section>
        <audio ref={audioRef} src='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' id='beep'></audio>
        <h3 id='timer-label'>{state}</h3>
        <h1 id='time-left'>{minutes}:{seconds}</h1>
    </section>
)
}

export default App
