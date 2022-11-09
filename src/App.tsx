import { useState } from 'react'
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
        isCounting: boolean
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
          <span id='break-decrement'>
            <FontAwesomeIcon icon={faArrowDown} onClick={() => dispatch(decrementBreak())}/>
          </span>
          <span id='break-length'>{breakNum}</span>
          <span id='break-increment'>
            <FontAwesomeIcon icon={faArrowUp} onClick={() => dispatch(incrementBreak())}/>
          </span>
        </div>
        <div>
          <p id='session-label'>Session Length</p>
          <span id='session-decrement'>
            <FontAwesomeIcon icon={faArrowDown} onClick={() => dispatch(decrementSession())}/>
          </span>
          <span id='session-length'>{session}</span>
          <span id='session-increment'>
            <FontAwesomeIcon icon={faArrowUp} onClick={() => dispatch(incrementSession())}/>
          </span>
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
      <audio id='beep'></audio>
    </div>
  )
}

const Timer = () => {

  const { minutes, seconds, isCounting } = useSelector((state: StateProps) => state.timer)
  const dispatch = useDispatch()
  
  if (isCounting) setTimeout(() => dispatch(decrementSeconds()), 1000)
  
  return (
  <section>
        <h3 id='timer-label'>Session</h3>
        <h1 id='time-left'>{minutes}:{seconds}</h1>
    </section>
)
}

export default App
