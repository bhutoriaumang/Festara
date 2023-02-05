import { useEffect, useState } from "react";
import EventCard from './componenets/EventCard'
import EventForm from "./componenets/EventForm";
import { useEventsContext } from "./hooks/useEventsContext"
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext'

const HomePage = () => {
  const { events, dispatch } = useEventsContext()
  const { logout } = useLogout()
  const {user} = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    const fetchEvents = async () => {

      
      const response = await fetch("/home/api/events/",{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({type:"SET_EVENTS", payload: json})
      }
    };
    if(user)
      fetchEvents();
  }, [dispatch,user]);

  return (
    <div className="home-page">
        <div className="home-page-header">
            <div className="home-page-header-logo">
                <img src={require('./assets/festara-logo-2.png')} alt={"Fest Logo"}/>
            </div>
            <div className="home-page-header-title">
              Festara 2023
            </div>
            <div className="home-page-header-navbar">
              <span>Welcome {user.name}!</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        <div className="left-home-page">
          <div className="events">
              {events && events.map((event)=>(
                  <EventCard key={event._id} event={event} />
              )) }
          </div>
        </div>
        <div className="right-home-page">
          <EventForm />
        </div>
    </div>
  );
};
export default HomePage;
