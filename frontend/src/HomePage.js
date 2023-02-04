import { useEffect, useState } from "react";
import EventCard from './componenets/EventCard'
import EventForm from "./componenets/EventForm";
import { useEventsContext } from "./hooks/useEventsContext"

const HomePage = () => {
  const { events, dispatch } = useEventsContext()

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/home/api/events/");
      const json = await response.json();
      if (response.ok) {
        dispatch({type:"SET_EVENTS", payload: json})
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="home-page">
        <div className="home-page-header">
            <div>
                <img src={require('./assets/festara-logo-2.png')} alt={""}/>
            </div>
          Festara 2023
        </div>
        <div className="events">
            {events && events.map((event)=>(
                <EventCard key={event._id} event={event} />
            )) }
        </div>
        <div className="eventForm">
          <EventForm />
        </div>
    </div>
  );
};
export default HomePage;
