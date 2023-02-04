import { createContext, useReducer } from 'react'

export const EventsContext = createContext()

export const eventsReducer = (state,action) => {
    console.log(action.payload,action.type)
    switch(action.type){
        case "SET_EVENTS":
            return {
                events: action.payload
            }
        case "CREATE_EVENT":
            return {
                events: [action.payload, ...state.events]
            }
        case "DELETE_EVENT":
            return {
                events: state.events.filter(e => e._id !== action.payload._id)
            }
        case "UPDATE_EVENT":
            return {
                events: [action.payload, ...state.events.filter(e => e._id !== action.payload._id)].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        default:
            return state
    }
}

export const EventsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(eventsReducer, { 
        events: null
      })
      
    return (
    <EventsContext.Provider value={{ ...state, dispatch }}>
        { children }
    </EventsContext.Provider>
    )
}