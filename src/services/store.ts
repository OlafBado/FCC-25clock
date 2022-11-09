import { configureStore, createSlice } from "@reduxjs/toolkit";

const updateString = (operator: string, str: string) => {
    switch(operator) {
        case '+': {
            let number = parseInt(str)
            number++
            return number.toString()
        }
        case '-': {
            let number = parseInt(str)
            number--
            return number.toString()
        }
        default:
            return
    }
}

let timerId: any = null;

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        minutes: '1',
        seconds: '00',
        breakNum: '5',
        session: '1',
        isCounting: false,
        isBreak: false,
        state: 'Session'
    },
    reducers: {
        incrementMinutes: (state) => {

        },
        decrementMinutes: (state) => {
            state.minutes = updateString('-', state.minutes)!
        },
        incrementSeconds: (state) => {

        },
        decrementSeconds: (state) => {
            if (!state.isCounting) return

            if (state.minutes === '00' && state.seconds === '00' && state.isBreak) {
                state.isBreak = false
                state.state = 'Session'
                state.minutes = state.session
                state.seconds = '00'
            }

            if (state.minutes === '00' && state.seconds === '00' && !state.isBreak) {
                state.isBreak = true
                state.state = 'Break'
                state.minutes = state.breakNum
                state.seconds = '00'
            }

            if (state.minutes === '1' && state.seconds === '00') {
                state.minutes = '00'
                state.seconds = '59'
                return
            } else if (parseInt(state.minutes) <= 10 && state.seconds === '00') {
                state.minutes = `0${updateString('-', state.minutes)}`
                state.seconds = '59'
                return
            } else if (parseInt(state.seconds) <= 10 && state.seconds !== '00') {
                state.seconds = `0${updateString('-', state.seconds)!}`
                return
            } else if (state.seconds === '00') {
                state.minutes = updateString('-', state.minutes)!
                state.seconds = '59'
                return
            } else {
                state.seconds = updateString('-', state.seconds)!
            }
        },
        incrementBreak: (state) => {
            if (state.breakNum === '60' || state.isCounting) return
            state.breakNum = updateString('+', state.breakNum)!
        },
        decrementBreak: (state) => {
            if (state.breakNum === '1'  || state.isCounting) return
            state.breakNum = updateString('-', state.breakNum)!
        },
        incrementSession: (state) => {
            if (state.session === '60'  || state.isCounting) return
            if (state.session <= '10') {
            }
            state.session = updateString('+', state.session)!
            state.seconds = '00'
            state.minutes = state.session.toString()

        },
        decrementSession: (state) => {
            if (state.session === '1'  || state.isCounting) return
            state.session = updateString('-', state.session)!
            state.seconds = '00'
            state.minutes = state.session.toString()
        },
        reset: (state) => {
            state.isCounting = false
            state.minutes = '25'
            state.seconds = '00'
            state.breakNum = '5'
            state.session = '25'
        },
        startStop: (state) => {
            state.isCounting = !state.isCounting
        },
    },
})

export const store = configureStore({
    reducer: {
        timer: timerSlice.reducer
    }
})

export const { 
    decrementMinutes,
    decrementSeconds,
    startStop,
    reset, 
    incrementBreak,
    decrementBreak, 
    incrementSession, 
    decrementSession
} = timerSlice.actions

