import { EventsContext } from "../context/eventsContext"
import { useContext } from "react"

export const useEventsContext = () => {
  const context = useContext(EventsContext)

  if(!context) {
    throw Error('useEventsContext must be used inside a EventsContextProvider')
  }

  return context
}